export type AuthCredentials = {
  login: string;
  password: string;
};

export type AuthSignInResponse = {
  token: string;
  uid: unknown;
};

export type AuthMeResponse = {
  name: string;
};

export type VerifiedUserLocals = {
  user: string;
};
