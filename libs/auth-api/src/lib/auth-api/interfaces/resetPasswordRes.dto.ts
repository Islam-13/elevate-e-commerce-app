import { ErrorResponseDTO } from "./error.interface";

export interface ResetPasswordResponseDTO{
    message: string;
    token: string;
    error:ErrorResponseDTO|null
    
}

export  interface ResetPasswordAdapterRes{
    message: string;
    token: string;
    error:ErrorResponseDTO|null;
    
}