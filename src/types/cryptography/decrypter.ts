export interface Decrypter {
  execute: (token: string) => Promise<{ email: string, userId: string } | null>;
}
