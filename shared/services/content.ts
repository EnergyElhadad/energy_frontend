import { Axios } from '@/core/lib/axios';

export interface Message {
  id: number;
  message: string;
  order: number;
  created_at: string;
}

export interface MessagesResponse {
  message: string;
  status: boolean;
  result: Message[];
}

export const getMessages = async (): Promise<MessagesResponse> => {
  try {
    const { data } = await Axios.get<MessagesResponse>(`/content/messages/`);
    return data;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return {
      message: 'Failed to fetch messages',
      status: false,
      result: [],
    };
  }
};
