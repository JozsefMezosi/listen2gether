import { UserResponse } from '../dto/login-user.dto';

export interface LoginUserSerivceResponse {
    user: UserResponse;
    access_token: string;
    redirectTo?: string;
}
