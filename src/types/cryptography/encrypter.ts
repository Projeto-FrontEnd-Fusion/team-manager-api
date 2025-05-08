export interface Encrypter {
  execute: (email: string, userId: string) => string;
}
