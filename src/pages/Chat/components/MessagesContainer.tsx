import React, { useRef, useEffect } from 'react';

import { MessageRenderer } from './MessageRenderer';
import { AudioPreview } from './AudioPreview';
import type { Message } from '../types';

interface MessagesContainerProps {
  messages: Message[];
  audioBlob: Blob | null;
  onSendAudio: () => void;
  chatId?: string;
  token?: string;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  messages,
  audioBlob,
  onSendAudio,
  chatId,
  token,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, audioBlob]);

  return (
    <div className='flex-1 overflow-y-auto pr-1 sm:pr-2 flex flex-col custom-scrollbar pt-8'>
      {messages.map((msg, index) => (
        <MessageRenderer
          key={index}
          message={msg}
          index={index}
          chatId={chatId}
          token={token}
        />
      ))}
      {audioBlob && <AudioPreview audioBlob={audioBlob} onSend={onSendAudio} />}
      <div ref={messagesEndRef} />
    </div>
  );
};
