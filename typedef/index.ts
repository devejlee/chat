export interface DataPayload {
  message?: string;
  user?: DataUser
  error?: string
}

export interface DataUser {
  email: string;
  emailVerified: null;
  image: string;
  name: string;
}