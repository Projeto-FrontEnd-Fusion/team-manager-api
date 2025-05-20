import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { parse } from 'path';

export function multerConfig(uploadPath: 'member' | 'project') {
  const pathImage = './statics/uploads/' + uploadPath;
  return {
    storage: diskStorage({
      destination: pathImage,
      filename: (req, file, callback) => {
        const fileName = parse(file.originalname).name.replace(/\s/g, '') + '-' + Math.round(Math.random()) * 1e9;
        const ext = parse(file.originalname).ext;
        callback(null, `${fileName}${ext}`);
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
