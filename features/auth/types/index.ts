/**
 * User interface based on the API response structure
 */
export interface User {
  id: number;
  phone_number: string;
  full_name: string;
  email: string;
  preferred_language: 'ar' | 'en';
}

/**
 * Login API response structure
 */
export interface LoginResponse {
  message: string;
  status: boolean;
  result: {
    token: string;
    user: User;
  };
}
