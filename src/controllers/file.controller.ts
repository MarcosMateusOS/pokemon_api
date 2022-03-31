import { Request, Response } from 'express';
import { FileService } from '../services/file/file.service';

const fileService = new FileService();

export class FileController {
  async uploadFile(request: Request, response: Response) {
    try {
      /**Flag via request para tomada de decisão para armazenamento dos dados do arquivo */
      const { flag } = request.body;

      if (flag === null) {
        return response
          .status(400)
          .send('Flag obrigatória para a leitura do arquivo');
      }
      /**Busca do path do arquivo */
      const pathFile: any = `./src/uploads/${request.file?.filename}`;

      /**Chamada do service do arquivo */
      const result = await fileService.saveFileContent(pathFile, flag);

      if (result.status === false) {
        return response.status(400).send(result.message);
      } else {
        return response.status(200).send({
          message:
            'Leitura do Aquivo de armazenamento dos dados no campo concluida',
        });
      }
    } catch (error) {
      return response.status(500).send({
        message: `Error na leitura => ${error.message}`,
      });
    }
  }
}
