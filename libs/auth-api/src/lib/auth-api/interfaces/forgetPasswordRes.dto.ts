import { ErrorResponseDTO } from './error.interface';

export interface ForgetPasswordResponseDTO {
  message: string;
  info: string;
  error: ErrorResponseDTO | null;
}

export interface ForgetPasswordAdapterRes {
  message: string;
  error: ErrorResponseDTO | null;
}
