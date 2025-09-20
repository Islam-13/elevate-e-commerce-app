import { ErrorResponseDTO } from "./error.interface";

export interface RegisterResponseDTO{
    message: string,
    token: string,
    user: {
        _id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        isVerified: boolean,
        createdAt: string
    }
    ,
    error:ErrorResponseDTO|null
    
}

export  interface RegisterAdapterRes{
    message: string;
    token: string;
    userEmail: string;
    error:ErrorResponseDTO|null;
    
}