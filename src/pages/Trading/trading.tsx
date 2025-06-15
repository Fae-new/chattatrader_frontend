import { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../reuseables/button';
import toast from 'react-hot-toast';

const mockCryptos = [
  { symbol: 'BTC', name: 'Bitcoin', price: 68900 },
  { symbol: 'ETH', name: 'Ethereum', price: 3800 },
  { symbol: 'SOL', name: 'Solana', price: 160 },
  { symbol: 'ADA', name: 'Cardano', price: 0.45 },
];

const tradeValidationSchema = Yup.object({
  fromSymbol: Yup.string().required('Select a crypto to sell'),
  toSymbol: Yup.string().required('Select a crypto to buy'),
  amount: Yup.number().typeError('Enter a valid amount').positive('Amount must be positive').required('Amount is required'),
  usdAmount: Yup.number().typeError('Enter a valid USD amount').positive('USD amount must be positive').required('USD amount is required'),
});

function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white max-h-[80vh] overflow-y-auto rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
        <div className="text-right">
          <button onClick={onClose} className="text-sm text-blue-600 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Trading() {
  const [cryptos, setCryptos] = useState<typeof mockCryptos>([]);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [buyMode, setBuyMode] = useState<0 | 1 | null>(null);

  useEffect(() => {
    setCryptos(mockCryptos);
  }, []);

  const handleSwapSubmit = (values: any) => {
    const action = buyMode === 1 ? 'Bought' : 'Sold';
    toast.success(`${action} ${values.amount} ${values.fromSymbol} ($${values.usdAmount}) to ${values.toSymbol}`);
    console.log(`${action} Submitted:`, values);
  };

  const getPrice = (symbol: string) => cryptos.find((c) => c.symbol === symbol)?.price || 0;

  const filteredCryptos = (term: string) =>
    cryptos.filter(
      (c) => c.name.toLowerCase().includes(term.toLowerCase()) || c.symbol.toLowerCase().includes(term.toLowerCase())
    );

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-gray-50 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white z-0" />
      <h1 className="text-2xl font-semibold mb-6 z-10">Swap anytime, anywhere.</h1>

      <div className="z-10 mb-4 flex gap-4">
        <button
          onClick={() => setBuyMode(0)}
          className={`px-4 py-2 rounded-md border ${
            buyMode === 0 ? 'bg-teal-600 text-white' : 'bg-white text-gray-800'
          }`}
        >
          Sell
        </button>
        <button
          onClick={() => setBuyMode(1)}
          className={`px-4 py-2 rounded-md border ${
            buyMode === 1 ? 'bg-teal-600 text-white' : 'bg-white text-gray-800'
          }`}
        >
          Buy
        </button>
      </div>

      {buyMode !== null && (
        <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl z-10 space-y-6 border border-gray-200">
          <Formik
            initialValues={{ fromSymbol: '', toSymbol: '', amount: '', usdAmount: '' }}
            validationSchema={tradeValidationSchema}
            onSubmit={handleSwapSubmit}
          >
            {({ values, setFieldValue, handleBlur, isSubmitting }) => {
              const price = getPrice(values.fromSymbol);

              const handleAmountChange = (e: any) => {
                const val = e.target.value;
                setFieldValue('amount', val);
                const num = parseFloat(val);
                if (!isNaN(num) && price > 0) {
                  setFieldValue('usdAmount', (num * price).toFixed(2));
                } else {
                  setFieldValue('usdAmount', '');
                }
              };

              const handleUsdAmountChange = (e: any) => {
                const val = e.target.value;
                setFieldValue('usdAmount', val);
                const num = parseFloat(val);
                if (!isNaN(num) && price > 0) {
                  setFieldValue('amount', (num / price).toFixed(8));
                } else {
                  setFieldValue('amount', '');
                }
              };

              return (
                <>
                  <Form className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Sell</label>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm('');
                            setFromOpen(true);
                          }}
                          className="w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 text-left"
                        >
                          {values.fromSymbol
                            ? `${cryptos.find((c) => c.symbol === values.fromSymbol)?.name} (${values.fromSymbol})`
                            : 'Select token'}
                        </button>
                        <ErrorMessage name="fromSymbol" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Buy</label>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm('');
                            setToOpen(true);
                          }}
                          className="w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 text-left"
                        >
                          {values.toSymbol
                            ? `${cryptos.find((c) => c.symbol === values.toSymbol)?.name} (${values.toSymbol})`
                            : 'Select token'}
                        </button>
                        <ErrorMessage name="toSymbol" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                      <label className="block text-sm font-medium mb-1">Amount ({values.fromSymbol || 'token'})</label>
                      <input
                        type="text"
                        name="amount"
                        placeholder="Token amount"
                        value={values.amount}
                        onChange={handleAmountChange}
                        onBlur={handleBlur}
                        className="w-full bg-white text-gray-900 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
                      <p className="text-xs text-gray-500 mt-1">
                        This is the amount in the selected crypto token.
                      </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                      <label className="block text-sm font-medium mb-1">Amount (USD)</label>
                      <input
                        type="text"
                        name="usdAmount"
                        placeholder="USD amount"
                        value={values.usdAmount}
                        onChange={handleUsdAmountChange}
                        onBlur={handleBlur}
                        className="w-full bg-white text-gray-900 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <ErrorMessage name="usdAmount" component="div" className="text-red-500 text-sm mt-1" />
                      <p className="text-xs text-gray-500 mt-1">
                        Equivalent value in USD based on current token price.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md"
                    >
                      {isSubmitting ? 'Swapping...' : buyMode === 1 ? 'Buy Now' : 'Sell Now'}
                    </Button>
                  </Form>

                  <Modal open={fromOpen} title="Select a token to sell" onClose={() => setFromOpen(false)}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full border border-gray-300 p-2 rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredCryptos(searchTerm).map((crypto) => (
                        <button
                          key={crypto.symbol}
                          onClick={() => {
                            setFieldValue('fromSymbol', crypto.symbol);
                            setFromOpen(false);
                          }}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                        >
                          {crypto.name} ({crypto.symbol})
                        </button>
                      ))}
                    </div>
                  </Modal>

                  <Modal open={toOpen} title="Select a token to buy" onClose={() => setToOpen(false)}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full border border-gray-300 p-2 rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredCryptos(searchTerm).map((crypto) => (
                        <button
                          key={crypto.symbol}
                          onClick={() => {
                            setFieldValue('toSymbol', crypto.symbol);
                            setToOpen(false);
                          }}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                        >
                          {crypto.name} ({crypto.symbol})
                        </button>
                      ))}
                    </div>
                  </Modal>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    The largest onchain marketplace. Buy and sell crypto on Ethereum and 12+ other chains.
                  </p>
                </>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}
