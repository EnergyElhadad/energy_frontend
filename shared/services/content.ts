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

export interface ContactInfo {
  id: number;
  phone_primary: string;
  phone_secondary: string | null;
  email: string;
  address: string;
  whatsapp_number: string;
  map_url: string;
}

export interface ContactInfoResponse {
  message: string;
  status: boolean;
  result: ContactInfo[];
}

export interface SocialMedia {
  id: number;
  logo: string | null;
  slogan: string | null;
  facebook_url: string | null;
  facebook_logo: string | null;
  x_url: string | null;
  x_logo: string | null;
  instagram_url: string | null;
  instagram_logo: string | null;
  youtube_url: string | null;
  youtube_logo: string | null;
  whatsapp_url: string | null;
  whatsapp_logo: string | null;
}

export interface SocialMediaResponse {
  message: string;
  status: boolean;
  result: SocialMedia[];
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

export const getContactInfo = async (): Promise<ContactInfoResponse> => {
  try {
    const { data } = await Axios.get<ContactInfoResponse>(`/content/contact-info/`);
    return data;
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    return {
      message: 'Failed to fetch contact info',
      status: false,
      result: [],
    };
  }
};

export const getSocialMedia = async (): Promise<SocialMediaResponse> => {
  try {
    const { data } = await Axios.get<SocialMediaResponse>(`/content/social-media/`);
    return data;
  } catch (error) {
    console.error('Failed to fetch social media:', error);
    return {
      message: 'Failed to fetch social media',
      status: false,
      result: [],
    };
  }
};
