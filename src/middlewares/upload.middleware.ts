import multer from 'multer';
import fs from 'fs';

class UploadMiddleware {
  private verifyExcel() {
    return (req: any, file: any, cb: any) => {
      if (
        file.mimetype.includes('excel') ||
        file.mimetype.includes('spreadsheetml')
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  }

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync('./src/uploads')) {
          console.log('n tem => ', __dirname + '/uploads');
          fs.mkdirSync('./src/uploads');
        }
        cb(null, './src/uploads');
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    });
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      fileFilter: this.verifyExcel(),
    };
  }
}

export const uploadFile = new UploadMiddleware();
