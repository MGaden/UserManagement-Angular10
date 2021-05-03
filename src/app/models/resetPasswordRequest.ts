export class ResetPasswordRequest {
    userId: string;
    password: string;
    confirmPassword : string;
    code: string;
  }

  export class RecoveryPasswordRequest {
    email: string;
    clientCallbackUrl? : string;
  }