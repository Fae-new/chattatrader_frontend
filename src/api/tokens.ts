import instance from "./client";

export const getTrendingTokens = async () => {
  const res = await instance.get(`/tokens/trending`);
  return res.data;
};

export const getTokenDetails = async (contractAddress: string) => {
  const res = await instance.get(`/tokens/${contractAddress}`);
  return res.data;
};
