export interface DataPayload {
  message?: string;
  users?: Array<DataUser>;
  error?: string
}

export interface DataUser {
  email: string;
  emailVerified: null;
  image: string;
  name: string;
}

export interface CurrentUser {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}