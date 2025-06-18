import React from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import type { Chat } from '../types';

interface ChatPanelProps {
  chats: Chat[];
  currentChat: Chat | null;
  isOpen: boolean;
  search: string;
  setSearch: (value: string) => void;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  currentChat,
  isOpen,
  search,
  setSearch,
  onClose,
  onSelectChat,
  onCreateNewChat,
}) => (
  <div
    className={`
      fixed top-0 right-0 z-50 h-full w-64 sm:w-72 bg-white/30 backdrop-blur-md p-4 border-l border-gray-200 flex flex-col
      transform transition-transform duration-300 ease-in-out
      lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
    `}
  >
    <button
      className='lg:hidden self-end mb-4 p-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer'
      onClick={onClose}
    >
      <FaTimes />
    </button>

    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-xl font-semibold'>Chats</h2>
      <button
        onClick={onCreateNewChat}
        className='p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors flex items-center justify-center'
      >
        <FaPlus size={14} />
      </button>
    </div>

    <input
      type='text'
      placeholder='Search chats...'
      className='w-full p-2 mb-4 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <ul className='space-y-2 overflow-y-auto flex-1 custom-scrollbar'>
      {chats
        .filter((chat) =>
          chat.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((chat, index) => (
          <li
            key={index}
            onClick={() => onSelectChat(chat.chatId)}
            className={`p-2 rounded cursor-pointer text-sm ${
              chat === currentChat
                ? 'bg-cyan-200 font-semibold'
                : 'text-gray-800 hover:bg-cyan-100'
            }`}
          >
            {chat.title}
          </li>
        ))}
    </ul>
  </div>
);
