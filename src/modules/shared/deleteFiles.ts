import * as fs from 'fs';
import * as path from 'path';

export async function deleteFile(fileName: string): Promise<boolean> {
  const uploadPath = path.join(__dirname, '../../..', fileName);

  try {
    await fs.promises.access(uploadPath, fs.constants.F_OK);
    await fs.promises.unlink(uploadPath);
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar o arquivo ${fileName}.`);
  }
}
