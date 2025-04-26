import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export function multerConfig(uploadPath: 'member' | 'project') {
  const pathImage = './statics/uploads/' + uploadPath;
  return {
    storage: diskStorage({
      destination: pathImage,
      filename: (req, file, cb) => {
        const fileName =
          path.parse(file.originalname).name.replace(/\s/g, '') +
          '-' +
          uuidv4();
        const extension = path.parse(file.originalname).ext;
        cb(null, `${fileName}${extension}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        cb(new BadRequestException('Arquivo inválido!'), false);
      } else {
        cb(null, true);
      }
    },
  };
}
