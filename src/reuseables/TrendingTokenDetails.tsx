import React from 'react';
import type { TrendingToken, TokenData } from '../pages/discovery/types';
import { Modal } from './modal';
import { Card } from './Card';
import { motion } from 'framer-motion';
import {
  FaTwitter,
  FaTelegram,
  FaDiscord,
  FaMedium,
  FaGlobe,
} from 'react-icons/fa';

interface Props {
  token: TrendingToken;
  tokenData: Partial<TokenData> | null;
  loading?: boolean;
  onClose: () => void;
}

export const TrendingTokenDetails: React.FC<Props> = ({
  token,
  tokenData,
  loading = false,
  onClose,
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      signDisplay: 'always',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  };

  return (
    <Modal onClose={onClose}>
      <div className='space-y-6 w-full max-h-[calc(90vh-4rem)] overflow-y-auto pr-2'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <div className='relative w-16 h-16'>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={token.logoURI}
              alt={token.name}
              className='w-full h-full rounded-full object-cover shadow-md'
            />
            {!loading && tokenData && (
              <div className='absolute -bottom-1 -right-1 bg-[#007b83] text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                #{token.rank}
              </div>
            )}
          </div>
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-900'>{token.name}</h2>
            <p className='text-gray-500 font-medium'>{token.symbol}</p>
          </div>
        </div>

        {loading ? (
          <Card className='bg-white p-6 space-y-6'>
            <div className='animate-pulse space-y-4'>
              <div className='h-4 bg-gray-200 rounded w-1/4'></div>
              <div className='h-8 bg-gray-200 rounded w-3/4'></div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                </div>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className='grid gap-4 grid-cols-1'>
            {/* Basic Info Card */}
            <Card className='bg-white p-4 md:p-6 space-y-4 md:space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Address</p>
                  <div className='flex items-center gap-2'>
                    <p className='font-mono text-sm break-all'>
                      {token.address}
                    </p>
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Decimals</p>
                  <p className='font-mono'>{token.decimals}</p>
                </div>
              </div>{' '}
              {tokenData?.extensions?.description && (
                <div className='pt-4 border-t border-gray-100'>
                  <p className='text-sm text-gray-500 mb-2'>About</p>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    {tokenData.extensions.description}
                  </p>
                </div>
              )}
              {/* Social Links */}
              {tokenData?.extensions && (
                <div className='pt-4 border-t border-gray-100'>
                  <p className='text-sm text-gray-500 mb-3'>Links</p>
                  <div className='flex gap-4'>
                    {tokenData.extensions.website && (
                      <a
                        href={tokenData.extensions.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 hover:text-[#007b83] transition-colors'
                      >
                        <FaGlobe size={20} />
                      </a>
                    )}
                    {tokenData.extensions.twitter && (
                      <a
                        href={tokenData.extensions.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 hover:text-[#1DA1F2] transition-colors'
                      >
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {tokenData.extensions.telegram && (
                      <a
                        href={tokenData.extensions.telegram}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 hover:text-[#0088cc] transition-colors'
                      >
                        <FaTelegram size={20} />
                      </a>
                    )}
                    {tokenData.extensions.discord && (
                      <a
                        href={tokenData.extensions.discord}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 hover:text-[#7289da] transition-colors'
                      >
                        <FaDiscord size={20} />
                      </a>
                    )}
                    {tokenData.extensions.medium && (
                      <a
                        href={tokenData.extensions.medium}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 hover:text-black transition-colors'
                      >
                        <FaMedium size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Stats Card */}
            <Card className='bg-white p-4 md:p-6'>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
                {/* Price */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Price</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {tokenData
                      ? formatNumber(tokenData?.price || 0)
                      : formatNumber(0)}
                  </p>
                  {tokenData && (
                    <p
                      className={`text-xs ${(tokenData?.priceChange24hPercent ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {formatPercent(tokenData?.priceChange24hPercent ?? 0)}{' '}
                      (24h)
                    </p>
                  )}
                </div>

                {/* Market Cap */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Market Cap</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {tokenData?.marketCap
                      ? formatNumber(tokenData.marketCap)
                      : 'N/A'}
                  </p>
                </div>

                {/* Liquidity */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Liquidity</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {formatNumber(token.liquidity)}
                  </p>
                </div>

                {/* Volume */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>24h Volume</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {formatNumber(token.volume24hUSD)}
                  </p>
                </div>

                {/* Trades */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>24h Trades</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {tokenData?.trade24h?.toLocaleString() ?? 'N/A'}
                  </p>
                </div>

                {/* Unique Wallets */}
                <div className='space-y-1.5'>
                  <p className='text-sm text-gray-500'>Unique Wallets (24h)</p>
                  <p className='text-base font-semibold text-[#007b83]'>
                    {tokenData?.uniqueWallet24h?.toLocaleString() ?? 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Modal>
  );
};
