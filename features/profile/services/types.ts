export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}

export interface RequestChangePhonePayload {
  new_phone_number: string;
}

export interface RequestChangePhoneResponse {
  status: boolean;
  message: string;
}

export interface ConfirmChangePhonePayload {
  new_phone_number: string;
  otp: string;
}

export interface ConfirmChangePhoneResponse {
  status: boolean;
  message: string;
}
