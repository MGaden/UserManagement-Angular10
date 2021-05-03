export class SignUpRequest {
    userName: string;
    password: string;
    confirmPassword : string;
    email?: string;
    clientCallbackUrl? : string;
  }
  