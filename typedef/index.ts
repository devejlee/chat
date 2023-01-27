export interface DataPayload {
  message?: string;
  user?: {
    email: string;
    emailVerified: null;
    image: string;
    name: string;
  }
  error?: string
}