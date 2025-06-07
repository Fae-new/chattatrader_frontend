import { useState } from 'react';
import { Button } from '../../reuseables/button';
import { Modal } from '../../reuseables/modal';
import { TrendingList } from '../../reuseables/TrendingList';
import { AnimatePresence } from 'framer-motion';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../reuseables/tabs';

interface TrendingItem {
  id: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
}

type Chain = 'solana' | 'ethereum' | 'base';

const Discover: React.FC = () => {
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell' | null>(null);
  const [selectedChain, setSelectedChain] = useState<Chain>('solana');
  const [showDetails, setShowDetails] = useState<TrendingItem | null>();
  const [showTradeModal, setShowTradeModal] = useState<TrendingItem | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleChainClick = (chain: Chain) => {
    console.log(showDetails);
    if (selectedChain === chain) {
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setSelectedChain(chain);
        setLoading(false);
      }, 800); // simulate API loading
    }
  };

  const getChainLabel = (chain: Chain) => {
    switch (chain) {
      case 'solana':
        return 'Solana';
      case 'ethereum':
        return 'Ethereum';
      case 'base':
        return 'Base';
    }
  };

  return (
    <div className='pt-2 px-4 md:px-6 lg:px-10 space-y-6 bg-[#FFFFFF] min-h-screen'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Search Input */}
        <div className='w-full'>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Search by Address / txn hash / block / token'
              className='w-full px-4 pr-10 py-2 border border-[#334155] bg-transparent placeholder-[#A7A7A7] text-[#000000] rounded-[24px] focus:outline-none text-sm sm:text-base'
            />
            <img
              src='/images/search.svg'
              alt='Search'
              className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5'
            />
          </div>
        </div>
      </div>

      {/* Trending Section with Tabs */}
      <div className='w-full max-w-7xl mx-auto space-y-4'>
        <h2 className='text-xl md:text-2xl font-semibold text-[#0f172a]'>
          Trending Tokens
        </h2>

        {/* Subheading showing selected tab */}
        <p className='text-sm text-[#475569] font-medium'>
          Trending on {getChainLabel(selectedChain)}
        </p>

        <Tabs
          value={selectedChain}
          onValueChange={(val) => handleChainClick(val as Chain)}
        >
          <TabsList className='flex flex-row sm:flex-row items-start gap-2 p-2 bg-[#F8F8F8] rounded-lg md:w-[295px] md:h-[51px]'>
            {(['solana', 'ethereum', 'base'] as Chain[]).map((chain) => (
              <TabsTrigger
                key={chain}
                value={chain}
                className={`w-full sm:w-auto px-3 py-2 md:w-[89px] md:h-[35px] text-xs md:text-sm border transition duration-200 ease-in-out rounded-md
                ${
                  selectedChain === chain
                    ? 'bg-[#FF9500] text-[#000000] border-[#FF9500]'
                    : 'bg-[#FAFAFA] text-[#000000] border-[#FF9500] hover:bg-[#fff5e6]'
                }`}
              >
                {getChainLabel(chain)}
              </TabsTrigger>
            ))}
          </TabsList>

          {(['solana', 'ethereum', 'base'] as Chain[]).map((chain) => (
            <TabsContent key={chain} value={chain}>
              <AnimatePresence>
                {selectedChain === chain && (
                  <TrendingList
                    chain={chain}
                    loading={loading}
                    onDetails={setShowDetails}
                    onTrade={setShowTradeModal}
                  />
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modals */}
      {showTradeModal && tradeAction && (
        <Modal
          onClose={() => {
            setShowTradeModal(null);
            setTradeAction(null);
          }}
        >
          <div className='space-y-6'>
            <div className='text-center text-lg font-semibold'>
              {tradeAction === 'buy'
                ? `Buy ${showTradeModal.name}`
                : `Sell ${showTradeModal.name}`}
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Token Information
                </label>
                <input
                  type='text'
                  placeholder={`Enter ${showTradeModal.name} details`}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Amount
                </label>
                <input
                  type='number'
                  placeholder='0.00'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Estimated Cost
                </label>
                <input
                  type='text'
                  placeholder='$0.00'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
                  disabled
                />
              </div>

              <div className='flex justify-end'>
                <button
                  className={`px-6 py-2 text-[#FAFAFA] rounded-md text-sm ${
                    tradeAction === 'buy'
                      ? 'bg-[#FF9500]'
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {tradeAction === 'buy' ? 'Buy Token' : 'Sell Token'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showTradeModal && !tradeAction && (
        <Modal onClose={() => setShowTradeModal(null)}>
          <div className='flex gap-4 animate-slide-up justify-center'>
            <Button
              className='bg-[#FF9500] text-[#FAFAFA] w-full md:w-[93px] md:[29px]'
              onClick={() => setTradeAction('buy')}
            >
              Buy
            </Button>
            <Button
              className='bg-red-600 text-[#FAFAFA] w-full md:w-[93px] md:[29px]'
              onClick={() => setTradeAction('sell')}
            >
              Sell
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Discover;
