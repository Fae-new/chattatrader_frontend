import instance from './client';

export interface BuyRequest {
  amountInUsd: string;
  tokenAddress: string;
}

export interface SellRequest {
  percentage: string;
  tokenAddress: string;
}

export interface TradeResponse {
  success: boolean;
  message: string;
  data: {
    transactionHash?: string;
    amount?: number;
    price?: number;
  };
}

export const buyToken = async (
  request: BuyRequest,
  token: string
): Promise<TradeResponse> => {
  return instance
    .post<TradeResponse>('/trading/buy', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const sellToken = async (
  request: SellRequest,
  token: string
): Promise<TradeResponse> => {
  return instance
    .post<TradeResponse>('/trading/sell', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
