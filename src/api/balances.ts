import type { WalletData } from '../pages/wallet/types';
import instance from './client';

export type UserBalanceResponse = {
  eth: WalletData;
  sol: WalletData;
  base: WalletData;
};

export const getUserBalance = async (
  token: string,
  userId: string
): Promise<UserBalanceResponse> => {
  const res = await instance.get(`/balances/getuserbalance?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
