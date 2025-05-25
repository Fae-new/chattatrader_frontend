export type Trade = {
  type: 'Buy' | 'Sell' | 'Transfer';
  amount: string;
  chain: string;
  status: 'Successful' | 'Failed' | 'Pending';
  date: Date;
  tokenIn: string;
  tokenOut: string;
  hash: string;
};
export type TradeType = 'Buy' | 'Sell' | 'Transfer';
export type TradeStatus = 'Successful' | 'Failed' | 'Pending';

export const defaultTrades: Trade[] = [
  {
    type: 'Buy',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Successful',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'USDT',
    tokenOut: 'SOL',
    hash: '0xabc123',
  },
  {
    type: 'Sell',
    amount: '$1,200',
    chain: 'Bitcoin',
    status: 'Failed',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'BTC',
    tokenOut: 'USDC',
    hash: '0xdef456',
  },
  {
    type: 'Sell',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Pending',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'SOL',
    tokenOut: 'ETH',
    hash: '0xghi789',
  },
  {
    type: 'Buy',
    amount: '$1,200',
    chain: 'Sofiatx',
    status: 'Successful',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'USDT',
    tokenOut: 'SOF',
    hash: '0xjkl012',
  },
  {
    type: 'Buy',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Successful',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'USDT',
    tokenOut: 'SOL',
    hash: '0xmno345',
  },
  {
    type: 'Sell',
    amount: '$1,200',
    chain: 'True USDT',
    status: 'Failed',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'TUSD',
    tokenOut: 'USDT',
    hash: '0xpqr678',
  },
  {
    type: 'Transfer',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Successful',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'SOL',
    tokenOut: 'SOL',
    hash: '0xstu901',
  },
  {
    type: 'Transfer',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Pending',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'SOL',
    tokenOut: 'SOL',
    hash: '0xvwx234',
  },
  {
    type: 'Sell',
    amount: '$1,200',
    chain: 'Solana',
    status: 'Successful',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: 'SOL',
    tokenOut: 'USDT',
    hash: '0xyz567',
  },
];
