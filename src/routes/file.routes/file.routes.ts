import { Router } from 'express';
import multer from 'multer';
const FileRoutes = Router();

/* Middeleware para upload de arquivo */
import { uploadFile } from '../../middlewares/upload.middleware';

import { FileController } from '../../controllers/file.controller';
/**Controller do File */
const fileController = new FileController();

FileRoutes.post(
  '/upload',
  multer(uploadFile.getConfig).single('file'),
  fileController.uploadFile,
);

export { FileRoutes };
