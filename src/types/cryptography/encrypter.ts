export interface Encrypter {
  execute: (userId: string) => string;
}
