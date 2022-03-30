import { Request, Response } from 'express';
import { Body, Controller, Post, Route } from 'tsoa';
import { FileService } from '../services/file/file.service';

const fileService = new FileService();

@Route('/upload')
export class FileController extends Controller {
  @Post()
  async uploadFile(@Body() request: Request, response: Response) {
    try {
      console.log('LENDO ARQUIVO...');

      const { flag } = request.body;

      if (flag === null) {
        return response
          .status(400)
          .send('Flag obrigatória para a leitura do arquivo');
      }
      const pathFile: any = `./src/uploads/${request.file?.filename}`;
      const result = await fileService.saveFileContent(pathFile, flag);
      console.log(result);
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
