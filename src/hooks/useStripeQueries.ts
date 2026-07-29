import { useQuery } from '@tanstack/react-query';
import {
  fetchStripeConfig,
  fetchServerOrderById,
  fetchServerOrders,
  StripeConfigResponse,
  ServerOrder,
} from '../services/stripeApi';

export function useStripeConfig() {
  return useQuery<StripeConfigResponse>({
    queryKey: ['stripeConfig'],
    queryFn: fetchStripeConfig,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useServerOrder(orderId: string) {
  return useQuery<ServerOrder | null>({
    queryKey: ['serverOrder', orderId],
    queryFn: () => fetchServerOrderById(orderId),
    enabled: Boolean(orderId),
    refetchInterval: 3000, // Poll every 3 seconds for real-time webhook updates
  });
}

export function useServerOrders() {
  return useQuery<ServerOrder[]>({
    queryKey: ['serverOrders'],
    queryFn: fetchServerOrders,
    staleTime: 1000 * 30,
  });
}
