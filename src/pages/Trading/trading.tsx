import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../reuseables/button';
import { FaTimes } from 'react-icons/fa';

const nativeTokens = [
  { symbol: 'ETH', name: 'Ethereum', price: 3800, chain: 'ethereum' },
  { symbol: 'SOL', name: 'Solana', price: 160, chain: 'solana' },
  { symbol: 'ETH', name: 'Ethereum (Base)', price: 3800, chain: 'base' },
];

const mockCryptos = [
  // Ethereum tokens
  { symbol: 'USDC', name: 'USD Coin', price: 1.0, chain: 'ethereum' },
  { symbol: 'USDT', name: 'Tether', price: 1.0, chain: 'ethereum' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 68900, chain: 'ethereum' },
  { symbol: 'LINK', name: 'Chainlink', price: 14.5, chain: 'ethereum' },
  { symbol: 'UNI', name: 'Uniswap', price: 8.2, chain: 'ethereum' },
  { symbol: 'AAVE', name: 'Aave', price: 95.3, chain: 'ethereum' },
  { symbol: 'MKR', name: 'Maker', price: 1250, chain: 'ethereum' },
  { symbol: 'COMP', name: 'Compound', price: 48.7, chain: 'ethereum' },

  // Solana tokens
  { symbol: 'USDC', name: 'USD Coin (Solana)', price: 1.0, chain: 'solana' },
  { symbol: 'RAY', name: 'Raydium', price: 2.15, chain: 'solana' },
  { symbol: 'SRM', name: 'Serum', price: 0.78, chain: 'solana' },
  { symbol: 'ORCA', name: 'Orca', price: 1.45, chain: 'solana' },
  { symbol: 'MNGO', name: 'Mango', price: 0.032, chain: 'solana' },
  { symbol: 'STEP', name: 'Step Finance', price: 0.085, chain: 'solana' },
  { symbol: 'COPE', name: 'Cope', price: 0.042, chain: 'solana' },

  // Base tokens
  { symbol: 'USDC', name: 'USD Coin (Base)', price: 1.0, chain: 'base' },
  { symbol: 'DAI', name: 'Dai (Base)', price: 1.0, chain: 'base' },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin (Base)',
    price: 68900,
    chain: 'base',
  },
  { symbol: 'LINK', name: 'Chainlink (Base)', price: 14.5, chain: 'base' },
  { symbol: 'UNI', name: 'Uniswap (Base)', price: 8.2, chain: 'base' },
  { symbol: 'AERO', name: 'Aerodrome', price: 1.25, chain: 'base' },
  { symbol: 'BALD', name: 'Bald', price: 0.000045, chain: 'base' },
];

// Mock user balances for demonstration
const mockBalances = {
  ETH: 2.3,
  SOL: 15.7,
  USDC: 5000,
  USDT: 2500,
  WBTC: 0.1,
  LINK: 50,
  UNI: 25,
  AAVE: 5,
  MKR: 0.5,
  COMP: 10,
  RAY: 100,
  SRM: 200,
  ORCA: 150,
  MNGO: 5000,
  STEP: 1000,
  COPE: 2500,
  DAI: 1000,
  AERO: 500,
  BALD: 1000000,
};

// Chain native tokens mapping
const chainNativeTokens = {
  ethereum: 'ETH',
  solana: 'SOL',
  base: 'ETH',
};

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50'>
      <div className='bg-white max-h-[80vh] overflow-y-auto rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4 mx-4 relative'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
            aria-label='Close modal'
          >
            <FaTimes className='w-5 h-5' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Trading() {
  const [cryptos, setCryptos] = useState<typeof mockCryptos>([]);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [buyMode, setBuyMode] = useState<0 | 1>(1);
  const [formData, setFormData] = useState({
    fromSymbol: '',
    toSymbol: '',
    amount: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCryptos(mockCryptos);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fromSymbol) {
      newErrors.fromSymbol = 'Select a crypto to trade';
    }
    if (!formData.toSymbol) {
      newErrors.toSymbol = 'Select a crypto to trade';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (
      isNaN(parseFloat(formData.amount)) ||
      parseFloat(formData.amount) <= 0
    ) {
      newErrors.amount =
        buyMode === 0
          ? 'Percentage must be a positive number'
          : 'Amount must be a positive number';
    } else if (buyMode === 0 && parseFloat(formData.amount) > 100) {
      newErrors.amount = 'Percentage cannot exceed 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSwapSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const action = buyMode === 1 ? 'Bought' : 'Sold';
      let tokenAmount: number;
      let usdValue: number;

      if (buyMode === 1) {
        // Buy mode: amount is in tokens
        tokenAmount = parseFloat(formData.amount);
        usdValue = tokenAmount * getPrice(formData.fromSymbol);
      } else {
        // Sell mode: amount is percentage
        const percentage = parseFloat(formData.amount);
        const balance =
          mockBalances[formData.fromSymbol as keyof typeof mockBalances] || 0;
        tokenAmount = (balance * percentage) / 100;
        usdValue = tokenAmount * getPrice(formData.fromSymbol);
      }

      toast.success(
        `${action} ${tokenAmount.toFixed(6)} ${formData.fromSymbol} ($${usdValue.toFixed(2)})`
      );
      console.log(`${action} Submitted:`, {
        ...formData,
        calculatedTokens: tokenAmount,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const getPrice = (symbol: string, chain?: string) => {
    if (chain) {
      return (
        cryptos.find((c) => c.symbol === symbol && c.chain === chain)?.price ||
        0
      );
    }
    return cryptos.find((c) => c.symbol === symbol)?.price || 0;
  };

  const getBalance = (symbol: string) =>
    mockBalances[symbol as keyof typeof mockBalances] || 0;

  const getTokenBySymbolAndChain = (symbol: string, chain: string) =>
    cryptos.find((c) => c.symbol === symbol && c.chain === chain);

  const getNativeTokenForChain = (chain: string) => {
    const nativeSymbol =
      chainNativeTokens[chain as keyof typeof chainNativeTokens];
    return nativeTokens.find(
      (c) => c.symbol === nativeSymbol && c.chain === chain
    );
  };

  const handleTokenSelection = (
    crypto: (typeof mockCryptos)[0],
    isFromField: boolean
  ) => {
    if (isFromField) {
      setFormData((prev) => ({
        ...prev,
        fromSymbol: crypto.symbol,
      }));
      setFromOpen(false);
      if (errors.fromSymbol) {
        setErrors((prev) => ({ ...prev, fromSymbol: '' }));
      }

      // Auto-select native token for the opposite field if in buy mode
      if (buyMode === 1) {
        const nativeToken = getNativeTokenForChain(crypto.chain);
        if (nativeToken && nativeToken.symbol !== crypto.symbol) {
          setFormData((prev) => ({
            ...prev,
            fromSymbol: crypto.symbol,
            toSymbol: nativeToken.symbol,
          }));
          if (errors.toSymbol) {
            setErrors((prev) => ({ ...prev, toSymbol: '' }));
          }
        }
      }
    } else {
      // Selecting the second field (Sell in buy mode, Buy in sell mode)
      setFormData((prev) => ({
        ...prev,
        toSymbol: crypto.symbol,
      }));
      setToOpen(false);
      if (errors.toSymbol) {
        setErrors((prev) => ({ ...prev, toSymbol: '' }));
      }

      // Auto-select native token for the opposite field if in sell mode
      if (buyMode === 0) {
        const nativeToken = getNativeTokenForChain(crypto.chain);
        if (nativeToken && nativeToken.symbol !== crypto.symbol) {
          setFormData((prev) => ({
            ...prev,
            toSymbol: crypto.symbol,
            fromSymbol: nativeToken.symbol,
          }));
          if (errors.fromSymbol) {
            setErrors((prev) => ({ ...prev, fromSymbol: '' }));
          }
        }
      }
    }
  };

  const isNativeTokenField = (fieldType: 'from' | 'to') => {
    if (buyMode === 1) {
      // In buy mode, "to" field (sell field) should be auto-selected native token
      return fieldType === 'to';
    } else {
      // In sell mode, "from" field should be manually selectable
      return false;
    }
  };

  const filteredCryptos = (term: string) =>
    cryptos.filter(
      (c) =>
        c.name.toLowerCase().includes(term.toLowerCase()) ||
        c.symbol.toLowerCase().includes(term.toLowerCase())
    );

  const price = getPrice(formData.fromSymbol);
  const balance = getBalance(formData.fromSymbol);

  const calculateUsdValue = () => {
    if (!formData.amount || price <= 0) return '0.00';

    if (buyMode === 1) {
      // Buy mode: amount is in tokens
      return (parseFloat(formData.amount) * price).toFixed(2);
    } else {
      // Sell mode: amount is percentage
      const percentage = parseFloat(formData.amount);
      const tokensToSell = (balance * percentage) / 100;
      return (tokensToSell * price).toFixed(2);
    }
  };

  const usdValue = calculateUsdValue();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, amount: val }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const getTokensToSell = () => {
    if (buyMode === 1 || !formData.amount || !formData.fromSymbol) return 0;
    const percentage = parseFloat(formData.amount);
    return (balance * percentage) / 100;
  };

  return (
    <div className='min-h-screen relative bg-gray-50 text-gray-900 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white z-0' />

      <div className='relative z-10 px-4 py-2 sm:py-4'>
        <div className='max-w-md mx-auto'>
          <h1 className='text-2xl font-semibold mb-6 text-center'>
            Manual Trading
          </h1>

          <div className='bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200'>
            {/* Buy/Sell Toggle inside the card */}
            <div className='flex gap-2 bg-gray-100 p-1 rounded-lg'>
              <button
                onClick={() => setBuyMode(1)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  buyMode === 1
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setBuyMode(0)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  buyMode === 0
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sell
              </button>
            </div>

            <div className='space-y-4'>
              <div className='flex space-x-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1'>
                    {buyMode === 1 ? 'Buy' : 'Sell'}
                  </label>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFromOpen(true);
                    }}
                    className='w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 text-left'
                  >
                    {formData.fromSymbol
                      ? `${cryptos.find((c) => c.symbol === formData.fromSymbol)?.name} (${formData.fromSymbol})`
                      : 'Select token'}
                  </button>
                  {errors.fromSymbol && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.fromSymbol}
                    </div>
                  )}
                  {/* Show balance for sell mode */}
                  {buyMode === 0 && formData.fromSymbol && (
                    <div className='text-xs text-gray-500 mt-1'>
                      Balance: {balance.toFixed(4)} {formData.fromSymbol}
                    </div>
                  )}
                </div>

                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1'>
                    {buyMode === 1 ? 'Sell' : 'Buy'}
                  </label>
                  <button
                    onClick={() => {
                      if (!isNativeTokenField('to')) {
                        setSearchTerm('');
                        setToOpen(true);
                      }
                    }}
                    className={`w-full p-2 rounded-md border text-left ${
                      isNativeTokenField('to')
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed border-gray-300'
                        : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                    disabled={isNativeTokenField('to')}
                  >
                    {formData.toSymbol
                      ? `${cryptos.find((c) => c.symbol === formData.toSymbol) || nativeTokens.find((c) => c.symbol === formData.toSymbol)?.name} (${formData.toSymbol})`
                      : 'Select token'}
                  </button>
                  {errors.toSymbol && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.toSymbol}
                    </div>
                  )}
                  {isNativeTokenField('to') && formData.toSymbol && (
                    <div className='text-xs text-gray-500 mt-1'>
                      Auto-selected native token
                    </div>
                  )}
                </div>
              </div>

              <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                <label className='block text-sm font-medium mb-1'>
                  {buyMode === 1
                    ? `Amount (${formData.fromSymbol || 'token'})`
                    : 'Percentage to sell (%)'}
                </label>
                <input
                  type='text'
                  placeholder={
                    buyMode === 1 ? 'Token amount' : 'Percentage (0-100)'
                  }
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className='w-full bg-white text-gray-900 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
                {errors.amount && (
                  <div className='text-red-500 text-sm mt-1'>
                    {errors.amount}
                  </div>
                )}
                <p className='text-xs text-gray-500 mt-1'>
                  {buyMode === 1
                    ? 'Amount in tokens.'
                    : 'Percentage to sell (0-100%).'}
                </p>
                {/* Show calculated tokens for sell mode */}
                {buyMode === 0 && formData.amount && formData.fromSymbol && (
                  <div className='text-xs font-medium text-gray-700 mt-1'>
                    {getTokensToSell().toFixed(4)} {formData.fromSymbol}
                  </div>
                )}
              </div>

              {/* USD Value Display (Read-only) */}
              <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
                <label className='block text-sm font-medium mb-1'>
                  USD Value
                </label>
                <div className='w-full bg-gray-100 text-gray-600 p-2 rounded-md border border-gray-200 text-right font-mono'>
                  ${usdValue}
                </div>
                <p className='text-xs text-gray-500 mt-1'>
                  Equivalent value in USD based on current token price.
                </p>
              </div>

              <Button
                onClick={handleSwapSubmit}
                disabled={isSubmitting}
                className='w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md'
              >
                {isSubmitting
                  ? 'Processing...'
                  : buyMode === 1
                    ? 'Buy Now'
                    : 'Sell Now'}
              </Button>
            </div>

            <Modal
              open={fromOpen}
              title={`Select a token to ${buyMode === 1 ? 'buy' : 'sell'}`}
              onClose={() => setFromOpen(false)}
            >
              <input
                type='text'
                placeholder='Search...'
                className='w-full border border-gray-300 p-2 rounded-md'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='max-h-60 overflow-y-auto space-y-2'>
                {filteredCryptos(searchTerm).map((crypto) => (
                  <button
                    key={`${crypto.symbol}-${crypto.chain}`}
                    onClick={() => handleTokenSelection(crypto, true)}
                    className='w-full text-left p-2 hover:bg-gray-100 rounded-md'
                  >
                    <div className='flex flex-col'>
                      <div className='flex justify-between items-center'>
                        <span>
                          {crypto.name} ({crypto.symbol})
                        </span>
                        <span className='text-sm text-gray-500'>
                          ${crypto.price.toLocaleString()}
                        </span>
                      </div>
                      <div className='text-xs text-gray-400 mt-1'>
                        {crypto.chain.charAt(0).toUpperCase() +
                          crypto.chain.slice(1)}
                      </div>
                      {buyMode === 0 && (
                        <div className='text-xs text-gray-500 mt-1'>
                          Balance: {getBalance(crypto.symbol).toFixed(4)}{' '}
                          {crypto.symbol}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Modal>

            <Modal
              open={toOpen}
              title={`Select a token to ${buyMode === 1 ? 'sell' : 'receive'}`}
              onClose={() => setToOpen(false)}
            >
              <input
                type='text'
                placeholder='Search...'
                className='w-full border border-gray-300 p-2 rounded-md'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='max-h-60 overflow-y-auto space-y-2'>
                {filteredCryptos(searchTerm).map((crypto) => (
                  <button
                    key={`${crypto.symbol}-${crypto.chain}`}
                    onClick={() => handleTokenSelection(crypto, false)}
                    className='w-full text-left p-2 hover:bg-gray-100 rounded-md'
                  >
                    <div className='flex flex-col'>
                      <div className='flex justify-between items-center'>
                        <span>
                          {crypto.name} ({crypto.symbol})
                        </span>
                        <span className='text-sm text-gray-500'>
                          ${crypto.price.toLocaleString()}
                        </span>
                      </div>
                      <div className='text-xs text-gray-400 mt-1'>
                        {crypto.chain.charAt(0).toUpperCase() +
                          crypto.chain.slice(1)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
