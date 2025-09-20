export interface ErrorResponseDTO {
  message: string|null;
  code: number;
}
export interface ErrorMessage {
    error: {
        message: string;
        code: number;
    }
}