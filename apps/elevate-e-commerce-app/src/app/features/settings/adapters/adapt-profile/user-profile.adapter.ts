import { ApiProfileResponse, UserProfile } from "../../interfaces/UserProfile/user-profile";

export function adaptUserProfile(res: ApiProfileResponse): UserProfile {
    const u = res.user;
    return {
        firstName: u.firstName ?? '',
        lastName: u.lastName ?? '',
        email: u.email ?? '',
        phone: u.phone ?? '',
        photo: u.photo ?? 'https://flower.elevateegy.com/uploads/default-profile.png',
        gender: u.gender === 'female' ? 'female' : 'male',
    }
}