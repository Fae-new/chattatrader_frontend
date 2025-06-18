import instance from "./client";

export const getTrendingTokens = async (chain: string) => {
    const res = await instance.get(`/tokens/trending?chain=${chain}`);
    return res.data;
};

export const getTokenDetails = async (contractAddress: string) => {
  const res = await instance.get(`/tokens/${contractAddress}`);
  return res.data;
};
