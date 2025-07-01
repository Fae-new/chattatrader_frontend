import type { Chat } from '../pages/Chat/types';
import instance from './client';

type CreateChatRequest = {
  userId: string;
  token: string;
};
type GetChatsReponse = { success: boolean; message: string; data: Chat[] };
type GetChatReponse = { success: boolean; message: string; data: Chat };

type CreateChatReponse = { success: boolean; message: string; data: Chat };

export const CreateChatRequest = async (
  data: CreateChatRequest
): Promise<Chat> => {
  return instance
    .post<CreateChatReponse>(
      '/chats/createchat',
      { userId: data.userId },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
    .then((res) => res.data.data);
};

export const getChats = async (userId: string): Promise<Chat[]> => {
  return instance
    .get<GetChatsReponse>('/chats/getchats', {
      params: { userId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.data.data);
};
export const getChatById = async (chatId: string): Promise<Chat> => {
  return instance
    .get<GetChatReponse>('/chats/getchat', {
      params: { chatId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.data.data);
};

export const updateChatTitle = async (
  chatId: string,
  title: string,
  token: string
): Promise<Chat> => {
  return instance
    .put<{ data: Chat }>(
      '/chats/editchat',
      { chatId, newTitle: title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data.data);
};

// Trading endpoints with chatId requirement
export interface ChatBuyRequest {
  chatId: string;
  amountInUsd: string;
  tokenAddress: string;
}

export interface ChatSellRequest {
  chatId: string;
  percentage: string;
  tokenAddress: string;
}

export interface ChatTradeResponse {
  success: boolean;
  message: string;
  data: {
    transactionHash?: string;
    amount?: number;
    price?: number;
  };
}

export const buyChatToken = async (
  request: ChatBuyRequest,
  token: string
): Promise<ChatTradeResponse> => {
  return instance
    .post<ChatTradeResponse>('/buy', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const sellChatToken = async (
  request: ChatSellRequest,
  token: string
): Promise<ChatTradeResponse> => {
  return instance
    .post<ChatTradeResponse>('/sell', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
