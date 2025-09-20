import { ErrorResponseDTO } from './error.interface';

export interface LogoutResponseDTO {
  message: string;
  error: ErrorResponseDTO | null;
}

export interface LogoutAdapterRes {
  message: string;
  error: ErrorResponseDTO | null;
}
