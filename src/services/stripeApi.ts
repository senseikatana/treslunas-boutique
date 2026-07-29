import { Product } from '../types';

export interface StripeConfigResponse {
  isConfigured: boolean;
  mode: 'test' | 'live' | 'sandbox_demo';
  hasSecretKey: boolean;
  hasWebhookSecret?: boolean;
  publicKey: string;
  message: string;
}

export interface ProductsResponse {
  source: string;
  isStripeConnected: boolean;
  mode: string;
  products: Product[];
  message?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  status: string;
  mode: string;
  amount: number;
  currency: string;
  message?: string;
  error?: string;
}

export interface ServerOrder {
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

export const fetchStripeConfig = async (): Promise<StripeConfigResponse> => {
  try {
    const res = await fetch('/api/stripe-config');
    if (!res.ok) throw new Error('Error al conectar con la API de configuración');
    return await res.json();
  } catch (err) {
    return {
      isConfigured: false,
      mode: 'sandbox_demo',
      hasSecretKey: false,
      publicKey: (import.meta as any).env?.VITE_STRIPE_PUBLIC_KEY || 'pk_test_513LunasBoutiqueSandboxKeyExample9988776655',
      message: 'Modo Sandbox Activo (Servidor local o API de prueba)',
    };
  }
};

export const fetchProductsFromStripe = async (): Promise<ProductsResponse> => {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Respuesta no válida del servidor');
    return await res.json();
  } catch (err) {
    return {
      source: 'client_fallback',
      isStripeConnected: false,
      mode: 'sandbox_demo',
      products: [],
    };
  }
};

export const createPaymentIntentOnServer = async (
  amount: number,
  items: any[],
  orderId?: string
): Promise<PaymentIntentResponse> => {
  try {
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, items, orderId, currency: 'eur' }),
    });
    return await res.json();
  } catch (err: any) {
    return {
      clientSecret: `pi_mock_fallback_${Date.now()}`,
      paymentIntentId: `pi_mock_${Date.now()}`,
      status: 'requires_payment_method',
      mode: 'sandbox_demo',
      amount,
      currency: 'eur',
      error: err.message,
    };
  }
};

export const registerServerOrder = async (orderData: any): Promise<ServerOrder | null> => {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data.order || null;
  } catch (err) {
    console.error('Error registrando pedido en el servidor:', err);
    return null;
  }
};

export const fetchServerOrders = async (): Promise<ServerOrder[]> => {
  try {
    const res = await fetch('/api/orders');
    const data = await res.json();
    return data.orders || [];
  } catch (err) {
    return [];
  }
};

export const fetchServerOrderById = async (id: string): Promise<ServerOrder | null> => {
  try {
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const triggerMockWebhookEvent = async (payload: {
  paymentIntentId?: string;
  orderId?: string;
  eventType: 'payment_intent.succeeded' | 'payment_intent.payment_failed';
  errorReason?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/webhook/mock-trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
};

