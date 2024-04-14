export interface LoginResponse {
    id: number;
    email: string;
    fullName: string;
    accessToken: string;
    timestamp: string;
    success: boolean;
    statusCode: string;
}

export class LoginRequest {
    public email: string | null = null;
    public password: string | null = null;
}

export class RefreshTokenRequest {
    public AccessToken: string | null = null;
    public RefreshToken: string | null = null;
}


export class RefreshTokenResponse {
    public AccessToken: string | null = null;
    public RefreshToken: string | null = null;
}

export class ForgetPasswordRequest {
    public email: string | null = null;
}

export class ResetPasswordWithKeyRequest {
    public verificationKey: string | null = null;
    public newPassword: string | null = null;
    public confirmNewPassword: string | null = null;
}
