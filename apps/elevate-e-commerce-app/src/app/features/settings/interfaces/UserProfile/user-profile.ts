export interface ApiProfileResponse {
  message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: 'male' | 'female';
    phone: string;
    photo?: string;
    role: string;
    wishlist: any[];
    addresses?: Array<{
        street?: string;
        phone?: string;
        city?: string;
        lat?: string;
        long?: string;
        username?: string;
        _id?: string;
    }>;
    createdAt: string;
  };
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  photo?: string;
}

export interface ApiDeleteResponse {
  message: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: 'success' | string;
  token: string;      
}