import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  constructor() {}

  uploadFile(file: Express.Multer.File) {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(__dirname, '..', '..', 'uploads');

    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

    fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
    return `http://localhost:4200/api/uploads/${fileName}`;
  }
}
