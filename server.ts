import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createServer as createViteServer } from 'vite';
import { PRODUCTS } from './src/data/products.js';

dotenv.config();

const PORT = 3000;
const app = express();

// Server-side in-memory order store & transaction history
interface ServerOrder {
  id: string;
  paymentIntentId?: string;
  items: any[];
  shipping: any;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  status: 'Confirmado' | 'En preparación' | 'En camino' | 'Error de Pago' | 'Pendiente de Confirmación' | 'Cancelado';
  transactionError?: string;
  webhookEventsCount: number;
  logs: Array<{
    timestamp: string;
    type: string;
    message: string;
    status: string;
  }>;
}

const ordersStore = new Map<string, ServerOrder>();

// Raw body parser for Stripe Webhook signature verification
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// Standard JSON body parser for other API routes
app.use(express.json());

// Lazy Stripe client initialization
function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes('ExampleStripeSecretKey')) {
    return null;
  }
  try {
    return new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as any,
    });
  } catch (err) {
    console.error('Error al inicializar cliente de Stripe:', err);
    return null;
  }
}

// Helper to find order by ID or paymentIntentId
function findOrder(identifier: string): ServerOrder | undefined {
  if (ordersStore.has(identifier)) return ordersStore.get(identifier);
  for (const order of ordersStore.values()) {
    if (order.paymentIntentId === identifier || order.id === identifier) {
      return order;
    }
  }
  return undefined;
}

// Process Payment Intent Succeeded logic
function handlePaymentIntentSucceeded(paymentIntent: any): { success: boolean; order?: ServerOrder; message: string } {
  const intentId = paymentIntent.id;
  const orderId = paymentIntent.metadata?.orderId;
  const amount = paymentIntent.amount ? (paymentIntent.amount / 100).toFixed(2) : '0.00';
  const currency = (paymentIntent.currency || 'eur').toUpperCase();

  let order = findOrder(orderId || intentId);

  if (!order) {
    // Auto-create order record if webhook arrives before or during client order registration
    const newId = orderId || `3L-STRIPE-${Math.floor(100000 + Math.random() * 900000)}`;
    order = {
      id: newId,
      paymentIntentId: intentId,
      items: [],
      shipping: {
        fullName: paymentIntent.shipping?.name || paymentIntent.receipt_email || 'Cliente Stripe',
        address: paymentIntent.shipping?.address?.line1 || 'Dirección confirmada en pasarela',
        city: paymentIntent.shipping?.address?.city || 'Cambrils / Tarragona',
        postalCode: paymentIntent.shipping?.address?.postal_code || '43850',
        email: paymentIntent.receipt_email || paymentIntent.metadata?.email || 'cliente@3lunas.es',
        deliveryOption: 'standard',
      },
      paymentMethod: 'card',
      subtotal: Number(amount),
      shippingCost: 0,
      total: Number(amount),
      createdAt: new Date().toLocaleDateString('es-ES'),
      updatedAt: new Date().toISOString(),
      status: 'Confirmado',
      webhookEventsCount: 1,
      logs: [],
    };
    ordersStore.set(newId, order);
  } else {
    order.status = 'Confirmado';
    order.updatedAt = new Date().toISOString();
    order.webhookEventsCount = (order.webhookEventsCount || 0) + 1;
    if (intentId && !order.paymentIntentId) {
      order.paymentIntentId = intentId;
    }
  }

  const logEntry = {
    timestamp: new Date().toLocaleTimeString('es-ES'),
    type: 'payment_intent.succeeded',
    message: `Pago verificado con éxito en Stripe API (${amount} ${currency}). Estado de pedido actualizado a "Confirmado".`,
    status: 'Confirmado',
  };

  order.logs.unshift(logEntry);
  return {
    success: true,
    order,
    message: `Pedido ${order.id} actualizado a "Confirmado" tras captura de webhook payment_intent.succeeded.`,
  };
}

// Process Payment Intent Failed logic
function handlePaymentIntentFailed(paymentIntent: any, errorMsg?: string): { success: boolean; order?: ServerOrder; message: string } {
  const intentId = paymentIntent.id;
  const orderId = paymentIntent.metadata?.orderId;
  const reason = errorMsg || paymentIntent.last_payment_error?.message || 'Fondos insuficientes o tarjeta denegada en pasarela.';

  let order = findOrder(orderId || intentId);

  if (!order) {
    const newId = orderId || `3L-STRIPE-FAIL-${Math.floor(100000 + Math.random() * 900000)}`;
    order = {
      id: newId,
      paymentIntentId: intentId,
      items: [],
      shipping: { fullName: 'Intento de Compra', address: '', city: '', postalCode: '', email: 'error@3lunas.es', deliveryOption: 'local' },
      paymentMethod: 'card',
      subtotal: 0,
      shippingCost: 0,
      total: paymentIntent.amount ? paymentIntent.amount / 100 : 0,
      createdAt: new Date().toLocaleDateString('es-ES'),
      updatedAt: new Date().toISOString(),
      status: 'Error de Pago',
      transactionError: reason,
      webhookEventsCount: 1,
      logs: [],
    };
    ordersStore.set(newId, order);
  } else {
    order.status = 'Error de Pago';
    order.transactionError = reason;
    order.updatedAt = new Date().toISOString();
    order.webhookEventsCount = (order.webhookEventsCount || 0) + 1;
  }

  order.logs.unshift({
    timestamp: new Date().toLocaleTimeString('es-ES'),
    type: 'payment_intent.payment_failed',
    message: `Transacción rechazada por Stripe: ${reason}. Estado cambiado a "Error de Pago".`,
    status: 'Error de Pago',
  });

  return {
    success: false,
    order,
    message: `Transacción fallida registrada para pedido ${order.id}: ${reason}`,
  };
}

// API Route: Webhook Receiver (Stripe Standard Endpoint)
app.post(['/api/webhook', '/api/webhook/stripe'], async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripeClient();

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig && stripe) {
      // Production verification using Stripe Webhook Secret
      event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    } else {
      // Parse JSON from Buffer or raw body
      const bodyStr = Buffer.isBuffer(req.body)
        ? req.body.toString('utf8')
        : typeof req.body === 'string'
        ? req.body
        : JSON.stringify(req.body);
      event = JSON.parse(bodyStr);
    }
  } catch (err: any) {
    console.error(`⚠️ Error al verificar Webhook de Stripe: ${err.message}`);
    return res.status(400).json({ error: `Fallo en verificación de webhook: ${err.message}` });
  }

  console.log(`🔔 Webhook Stripe Recibido -> Tipo: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const result = handlePaymentIntentSucceeded(paymentIntent);
        return res.json({ received: true, ...result });
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const result = handlePaymentIntentFailed(paymentIntent);
        return res.json({ received: true, ...result });
      }

      case 'charge.succeeded': {
        const charge = event.data.object;
        const intentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
        if (intentId) {
          const order = findOrder(intentId);
          if (order) {
            order.logs.unshift({
              timestamp: new Date().toLocaleTimeString('es-ES'),
              type: 'charge.succeeded',
              message: `Recibo generado exitosamente. ID Recibo: ${charge.receipt_number || charge.id}`,
              status: order.status,
            });
          }
        }
        return res.json({ received: true, eventType: event.type });
      }

      default:
        console.log(`Evento de Webhook Stripe no controlado directamente: ${event.type}`);
        return res.json({ received: true, eventType: event.type, note: 'Evento registrado sin cambios de estado' });
    }
  } catch (procErr: any) {
    console.error('Error procesando evento de webhook:', procErr);
    return res.status(500).json({ error: procErr.message || 'Error interno procesando evento de webhook' });
  }
});

// API Route: Mock Webhook Trigger for Sandbox/Testing
app.post('/api/webhook/mock-trigger', (req, res) => {
  const { paymentIntentId, orderId, eventType = 'payment_intent.succeeded', errorReason } = req.body;

  if (!paymentIntentId && !orderId) {
    return res.status(400).json({ error: 'Se requiere paymentIntentId o orderId para simular el evento.' });
  }

  const mockIntent = {
    id: paymentIntentId || `pi_mock_trig_${Date.now()}`,
    amount: 11990,
    currency: 'eur',
    metadata: { orderId: orderId || '' },
    receipt_email: 'cliente.prueba@3lunas.es',
    last_payment_error: errorReason ? { message: errorReason } : null,
  };

  if (eventType === 'payment_intent.succeeded') {
    const result = handlePaymentIntentSucceeded(mockIntent);
    return res.json({ success: true, triggeredEvent: eventType, result });
  } else if (eventType === 'payment_intent.payment_failed') {
    const result = handlePaymentIntentFailed(mockIntent, errorReason || 'Fallo simulado en tarjeta de crédito/débito');
    return res.json({ success: true, triggeredEvent: eventType, result });
  } else {
    return res.status(400).json({ error: `Tipo de evento no soportado para pruebas: ${eventType}` });
  }
});

// API Routes: Order Management
app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  if (!orderData || !orderData.id) {
    return res.status(400).json({ error: 'Datos de pedido incompletos' });
  }

  const serverOrder: ServerOrder = {
    id: orderData.id,
    paymentIntentId: orderData.paymentIntentId || '',
    items: orderData.items || [],
    shipping: orderData.shipping || {},
    paymentMethod: orderData.paymentMethod || 'card',
    subtotal: orderData.subtotal || 0,
    shippingCost: orderData.shippingCost || 0,
    total: orderData.total || 0,
    createdAt: orderData.createdAt || new Date().toLocaleDateString('es-ES'),
    updatedAt: new Date().toISOString(),
    status: orderData.status || 'Pendiente de Confirmación',
    webhookEventsCount: 0,
    logs: [
      {
        timestamp: new Date().toLocaleTimeString('es-ES'),
        type: 'order.created',
        message: `Pedido registrado en el servidor (ID: ${orderData.id}, Total: €${Number(orderData.total || 0).toFixed(2)}).`,
        status: orderData.status || 'Pendiente de Confirmación',
      },
    ],
  };

  ordersStore.set(orderData.id, serverOrder);
  if (serverOrder.paymentIntentId) {
    ordersStore.set(serverOrder.paymentIntentId, serverOrder);
  }

  res.json({ success: true, order: serverOrder });
});

app.get('/api/orders', (req, res) => {
  const ordersList = Array.from(new Set(ordersStore.values()));
  res.json({ count: ordersList.length, orders: ordersList });
});

app.get('/api/orders/:id', (req, res) => {
  const order = findOrder(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }
  res.json(order);
});

// API Route: Stripe Config & Status Check
app.get('/api/stripe-config', (req, res) => {
  const stripe = getStripeClient();
  const secretKey = process.env.STRIPE_SECRET_KEY || '';
  const isTestKey = secretKey.startsWith('sk_test_');

  res.json({
    isConfigured: !!stripe,
    mode: stripe ? (isTestKey ? 'test' : 'live') : 'sandbox_demo',
    hasSecretKey: !!secretKey,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    publicKey: process.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_513LunasBoutiqueSandboxKeyExample9988776655',
    message: stripe
      ? `Stripe API conectado exitosamente en modo ${isTestKey ? 'TESTING (Pruebas)' : 'PRODUCCIÓN'}.`
      : 'Servidor ejecutando en modo Sandbox / Simulador de Pruebas. Añade tu STRIPE_SECRET_KEY en las variables de entorno para sincronizar con tu catálogo real de Stripe.',
  });
});

// API Route: Programmatically Fetch Products from Stripe API or Boutique Catalog
app.get('/api/products', async (req, res) => {
  const stripe = getStripeClient();

  if (!stripe) {
    return res.json({
      source: 'local_boutique_catalog',
      isStripeConnected: false,
      mode: 'sandbox_demo',
      products: PRODUCTS.map((p) => ({
        ...p,
        stripeProductId: `prod_mock_${p.id}`,
        stripePriceId: `price_mock_${p.id}`,
      })),
    });
  }

  try {
    const stripeProducts = await stripe.products.list({
      limit: 50,
      active: true,
      expand: ['data.default_price'],
    });

    if (!stripeProducts.data || stripeProducts.data.length === 0) {
      return res.json({
        source: 'stripe_api_fallback',
        isStripeConnected: true,
        mode: 'test',
        message: 'Conectado a Stripe API (0 productos encontrados en tu cuenta Stripe. Mostrando catálogo boutique de muestra).',
        products: PRODUCTS.map((p) => ({
          ...p,
          stripeProductId: `prod_stripe_${p.id}`,
          stripePriceId: `price_stripe_${p.id}`,
        })),
      });
    }

    const mappedProducts = stripeProducts.data.map((item, index) => {
      const defaultPriceObj = item.default_price as Stripe.Price | null;
      const unitAmount = defaultPriceObj?.unit_amount ? defaultPriceObj.unit_amount / 100 : 89.95;
      const currency = defaultPriceObj?.currency?.toUpperCase() || 'EUR';
      const fallbackImage = PRODUCTS[index % PRODUCTS.length].images[0];

      return {
        id: item.id,
        name: item.name,
        price: unitAmount,
        currency,
        category: item.metadata?.category || 'Boutique',
        description: item.description || 'Producto exclusivo sincronizado en directo desde Stripe API.',
        erikaAdvice: item.metadata?.advice || 'Combínalo con accesorios artesanales para resaltar su elegancia.',
        images: item.images && item.images.length > 0 ? item.images : [fallbackImage],
        sizes: item.metadata?.sizes ? item.metadata.sizes.split(',') : ['S', 'M', 'L'],
        colors: [
          { name: 'Color Exclusivo', hex: '#92003a' },
          { name: 'Noche', hex: '#111111' },
        ],
        isNew: index % 2 === 0,
        isBestseller: index % 3 === 0,
        stripeProductId: item.id,
        stripePriceId: typeof item.default_price === 'string' ? item.default_price : item.default_price?.id || '',
        details: [
          `Sincronizado vía Stripe API (ID: ${item.id})`,
          `Precio registrado en Stripe: ${unitAmount.toFixed(2)} ${currency}`,
          'Garantía de calidad 3 Lunas Boutique',
        ],
        careGuide: 'Lavar en ciclo delicado a baja temperatura.',
      };
    });

    res.json({
      source: 'stripe_api_live',
      isStripeConnected: true,
      mode: 'test',
      productsCount: mappedProducts.length,
      products: mappedProducts,
    });
  } catch (error: any) {
    console.error('Error al obtener productos desde Stripe API:', error);
    res.json({
      source: 'local_fallback_on_error',
      isStripeConnected: false,
      error: error.message,
      products: PRODUCTS,
    });
  }
});

// API Route: Create Stripe PaymentIntent on backend
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency = 'eur', items, orderId } = req.body;
  const stripe = getStripeClient();

  const numAmount = Number(amount);
  const amountInCents = Math.round((isNaN(numAmount) || numAmount <= 0 ? 10 : numAmount) * 100);

  if (!stripe) {
    return res.json({
      clientSecret: `pi_mock_secret_${Date.now()}_secret_test_3lunas`,
      paymentIntentId: `pi_mock_${Date.now()}`,
      status: 'requires_payment_method',
      mode: 'sandbox_demo',
      amount: amountInCents / 100,
      currency,
      message: 'PaymentIntent simulado para pruebas sin clave secreta real de Stripe.',
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        store: '3 Lunas Boutique',
        orderId: orderId || `3L-${Math.floor(100000 + Math.random() * 900000)}`,
        itemCount: Array.isArray(items) ? items.length : 1,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      mode: 'stripe_test_api',
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error: any) {
    console.error('Error creando PaymentIntent en Stripe:', error);
    res.status(500).json({
      error: error.message || 'No se pudo generar el pago en Stripe',
    });
  }
});

// Vite middleware / Static files serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[3 Lunas Boutique Server] Ejecutando en http://localhost:${PORT}`);
  });
}

startServer();

