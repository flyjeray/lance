import z from 'zod';

export const AuthCredentialsSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;

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
