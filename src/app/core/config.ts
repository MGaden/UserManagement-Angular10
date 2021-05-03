interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

// Session auth needs to use the same origin anyway
export const config: Config = {
  apiUrl: 'https://localhost:44316/api',
  userUrl: 'https://localhost:44316/api/user',
  authUrl: 'https://localhost:44316/api/auth',
  manageUrl: 'https://localhost:44316/api/manage',
  forgetPasswordCallBackUrl: 'http://localhost:4200/password',
  emailConfirmCallBackUrl: 'http://localhost:4200/confirm',
  auth: 'token'
};

