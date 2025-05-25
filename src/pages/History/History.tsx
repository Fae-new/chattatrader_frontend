import { useEffect, useState } from 'react';
import {
  defaultTrades,
  type Trade,
  type TradeStatus,
  type TradeType,
} from './types';
import { Link } from 'react-router-dom';
import BarChartIcon from './BarChartIcon';

const statusStyles: Record<TradeStatus, string> = {
  Successful: 'bg-teal-100 text-teal-600',
  Failed: 'bg-red-100 text-red-600',
  Pending: 'bg-blue-100 text-blue-600',
};

const typeArrow: Record<TradeType, string> = {
  Buy: '↑',
  Sell: '↓',
  Transfer: '↔',
};

const tableHeaders = [
  'Type',
  'Amount',
  'Chain',
  'Status',
  'Token In',
  'Token Out',
  'Hash',
  'Date',
];

export default function History() {
  const [trades] = useState<Trade[]>(defaultTrades);

  const tableheadStyles =
    'py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider';

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        // const response = await fetch('/api/trades');
        // const data = await response.json();
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-6 mt-3 lg:mt-0'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
          {/* Mobile: Centered title aligned with hamburger */}
          <div className='flex items-center justify-center sm:justify-start relative sm:static pt-2 sm:pt-0'>
            <h1 className='text-2xl font-semibold text-gray-800'>
              Trade History
            </h1>
          </div>

          <div className='flex items-center gap-2 justify-center sm:justify-end'>
            <button className='border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white'>
              Download CSV
            </button>
            <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
              <Link to={'/trade'}>+ New Trade</Link>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2 overflow-x-auto pb-2 sm:justify-start justify-center'>
          <button className='bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap'>
            All Trades
          </button>
          <button className='border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-white'>
            Buy Side
          </button>
          <button className='border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-white'>
            Sell Side
          </button>
        </div>
      </div>

      {/* Table */}
      {trades.length === 0 ? (
        // Empty State
        <div className='rounded-xl border border-gray-200 bg-white relative overflow-hidden'>
          <div className='flex flex-col items-center justify-center py-16 px-6 relative'>
            <div className='w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mb-6'>
              <BarChartIcon />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No trades yet
            </h3>
            <p className='text-gray-500 text-center mb-8 max-w-md'>
              Your trading history will appear here once you start making
              trades. Ready to get started?
            </p>
            <div className='flex gap-3'>
              <button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
                <Link to='/trade'> Start Trading</Link>
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className='absolute top-8 left-8 w-2 h-2 bg-orange-200 rounded-full opacity-60'></div>
          <div className='absolute top-12 right-12 w-1 h-1 bg-orange-300 rounded-full opacity-40'></div>
          <div className='absolute bottom-16 left-16 w-1.5 h-1.5 bg-orange-200 rounded-full opacity-50'></div>
          <div className='absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-orange-200 to-orange-100 rounded-full opacity-30'></div>
        </div>
      ) : (
        <div className='rounded-xl overflow-hidden border border-gray-200'>
          <div className='overflow-x-auto'>
            <table className='w-full bg-white'>
              <thead className='bg-gray-100 border-b border-gray-200'>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className={tableheadStyles}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {trades.map((trade, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='py-2 px-3 whitespace-nowrap'>
                      <div className='flex items-center gap-2 justify-center'>
                        <span
                          className={`font-medium text-center ${
                            trade.type === 'Buy'
                              ? 'text-green-500'
                              : trade.type === 'Sell'
                                ? 'text-red-500'
                                : 'text-blue-500'
                          }`}
                        >
                          {typeArrow[trade.type]}
                        </span>
                        <span className='text-sm'>{trade.type}</span>
                      </div>
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap font-medium text-center text-sm'>
                      {trade.amount}
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap text-center text-sm text-gray-600'>
                      {trade.chain}
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap text-center'>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusStyles[trade.status]
                        }`}
                      >
                        {trade.status}
                      </span>
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap text-center text-sm text-gray-600'>
                      {trade.tokenIn}
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap text-center text-sm text-gray-600'>
                      {trade.tokenOut}
                    </td>
                    <td className='py-2 px-3 text-center'>
                      <a
                        href={`https://etherscan.io/tx/${trade.hash}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:text-blue-600 hover:underline truncate max-w-[120px] inline-block text-sm'
                      >
                        {trade.hash}
                      </a>
                    </td>
                    <td className='py-2 px-3 whitespace-nowrap text-gray-500 text-sm'>
                      {new Date(trade.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-white'>
            <div className='text-sm text-gray-500'>
              Showing <span className='font-medium'>1</span> to{' '}
              <span className='font-medium'>3</span> of{' '}
              <span className='font-medium'>3</span> results
            </div>
            <div className='flex gap-2'>
              <button className='px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 bg-white'>
                Previous
              </button>
              <button className='px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 bg-white'>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
