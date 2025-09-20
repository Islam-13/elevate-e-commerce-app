import { ErrorResponseDTO } from './error.interface';

export interface VerifyCodeResponseDTO {
  status: string;
  error: ErrorResponseDTO | null;
}

export interface VerifyCodeAdapterRes {
  message: string | null;
  error: ErrorResponseDTO | null;
}
