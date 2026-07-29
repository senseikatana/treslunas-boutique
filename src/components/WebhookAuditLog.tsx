import React, { useState } from 'react';
import { triggerMockWebhookEvent } from '../services/stripeApi';
import { useServerOrder } from '../hooks/useStripeQueries';
import { CheckCircle2, AlertTriangle, RefreshCw, Send, Terminal } from 'lucide-react';

interface WebhookAuditLogProps {
  orderId: string;
  isDarkMode: boolean;
}

export const WebhookAuditLog: React.FC<WebhookAuditLogProps> = ({ orderId, isDarkMode }) => {
  const { data: serverOrder, isLoading, refetch } = useServerOrder(orderId);
  const [isTriggering, setIsTriggering] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSimulateWebhook = async (eventType: 'payment_intent.succeeded' | 'payment_intent.payment_failed', errorReason?: string) => {
    setIsTriggering(true);
    setTestResult(null);

    const res = await triggerMockWebhookEvent({
      orderId,
      paymentIntentId: serverOrder?.paymentIntentId || `pi_sim_${orderId}`,
      eventType,
      errorReason,
    });

    if (res.success || res.received) {
      setTestResult(`Webhook '${eventType}' ejecutado y procesado correctamente por el servidor.`);
    } else {
      setTestResult(`Error al ejecutar webhook: ${res.error || 'Respuesta inesperada'}`);
    }

    await refetch();
    setIsTriggering(false);
  };

  return (
    <div className={`p-5 sm:p-6 rounded-2xl border text-left space-y-4 shadow-sm ${
      isDarkMode ? 'bg-[#121214] border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
    }`}>
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#92003a] dark:text-[#c37b58]" />
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base">
              Monitor de Webhooks & Transacciones Stripe
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Captura en tiempo real de eventos Stripe y actualización automática de estado
            </p>
          </div>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs transition-colors"
          title="Actualizar estado"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#92003a]' : 'text-zinc-500'}`} />
        </button>
      </div>

      {/* State & Webhook Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <span className="text-[10px] text-zinc-500 uppercase font-mono-label font-bold block mb-1">Estado Servidor</span>
          <span className={`inline-flex items-center gap-1 font-bold ${
            serverOrder?.status === 'Confirmado'
              ? 'text-emerald-500'
              : serverOrder?.status === 'Error de Pago'
              ? 'text-rose-500'
              : 'text-amber-500'
          }`}>
            {serverOrder?.status === 'Confirmado' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {serverOrder?.status === 'Error de Pago' && <AlertTriangle className="w-3.5 h-3.5" />}
            {serverOrder?.status || 'Pendiente de Confirmación'}
          </span>
        </div>

        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <span className="text-[10px] text-zinc-500 uppercase font-mono-label font-bold block mb-1">ID PaymentIntent</span>
          <span className="font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300 truncate block">
            {serverOrder?.paymentIntentId || `pi_pending_${orderId.slice(-6)}`}
          </span>
        </div>

        <div className={`col-span-2 sm:col-span-1 p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <span className="text-[10px] text-zinc-500 uppercase font-mono-label font-bold block mb-1">Eventos Capturados</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            {serverOrder?.webhookEventsCount || 0} recibidos
          </span>
        </div>
      </div>

      {/* Interactive Webhook Simulator Buttons */}
      <div className="p-3.5 rounded-xl bg-[#92003a]/10 border border-[#92003a]/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#92003a] dark:text-[#c37b58] flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" />
            Probador de Eventos Webhook (Pruebas / Testing)
          </span>
          <span className="text-[9px] font-mono-label text-zinc-400">ENDPOINT: /api/webhook</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleSimulateWebhook('payment_intent.succeeded')}
            disabled={isTriggering}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3 h-3" />
            Simular payment_intent.succeeded
          </button>

          <button
            onClick={() => handleSimulateWebhook('payment_intent.payment_failed', 'Tarjeta rechazada por limite de crédito')}
            disabled={isTriggering}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <AlertTriangle className="w-3 h-3" />
            Simular payment_intent.payment_failed
          </button>
        </div>

        {testResult && (
          <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            ✓ {testResult}
          </p>
        )}
      </div>

      {/* Transaction & Audit Logs */}
      <div className="space-y-2">
        <span className="text-[11px] uppercase font-mono-label text-zinc-500 font-bold block">
          Historial de Eventos y Confirmación
        </span>

        {(!serverOrder?.logs || serverOrder.logs.length === 0) ? (
          <div className="p-3 text-center text-xs text-zinc-500 italic rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800">
            Aún no se han recibido eventos de webhook para este pedido.
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {serverOrder.logs.map((log, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-3 ${
                  log.type === 'payment_intent.succeeded'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : log.type === 'payment_intent.payment_failed'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                    : isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    : 'bg-white border-zinc-200 text-zinc-700'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {log.type}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-snug">{log.message}</p>
                </div>
                <span className="font-bold text-[10px] uppercase font-mono-label shrink-0">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
