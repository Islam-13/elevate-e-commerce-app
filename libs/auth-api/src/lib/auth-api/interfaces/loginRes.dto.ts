import { Address } from './../../../../../apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { ErrorResponseDTO } from './error.interface';

export interface LoginResponseDTO {
  message: string;
  token: string;
  user: UserDTO;
  error?: string;
}

export interface LoginAdapterRes {
  message: string;
  token: string;
  user: UserDTO;
  error?: string;
}
export interface UserDTO {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  addresses: Address[];
  photo: string;
  wishlist: [];
}
