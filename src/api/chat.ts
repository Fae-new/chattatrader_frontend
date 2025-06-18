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
