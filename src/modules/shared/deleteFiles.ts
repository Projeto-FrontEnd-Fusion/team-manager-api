import { promises, constants } from 'fs';
import { resolve } from 'path';

export async function deleteFile(fileName: string): Promise<boolean> {
  const uploadPath = resolve(process.cwd(), '', fileName);
  console.log('Deleting file at:', uploadPath);

  try {
    await promises.access(uploadPath, constants.F_OK);
    await promises.unlink(uploadPath);
    return true;
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    throw new Error(`Erro ao deletar o arquivo ${fileName}.`);
  }
}
