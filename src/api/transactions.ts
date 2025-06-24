import type { Transaction } from '../pages/History/types';
import instance from './client';

export const getTransactionHistory = async (
  token: string,
  userId: string
): Promise<Transaction[]> => {
  const res = await instance.get(`/transactions/history?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getTokenDetails = async (contractAddress: string) => {
  const res = await instance.get(`/tokens/${contractAddress}`);
  return res.data;
};
