import IRoute from '../../helper/route';
import * as Hapi from '@hapi/hapi';
import logger from '../../helper/logger';
import UploadController from './upload-controller';
import { AWSService } from '../../common/aws/aws-services';

export default class UploadRoute implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      logger.info('Started - S3 File Upload routes');
      const controller = new UploadController(new AWSService());
      server.route([
        {
          method: 'GET',
          path: '/api/s3/get/{file}',
          options: {
            handler: controller.get,
            description: 'Method to get a file from S3 bucket',
            auth: false,
          },
        },
        {
          method: 'GET',
          path: '/api/s3/list',
          options: {
            handler: controller.list,
            description: 'Method to get files from S3 bucket',
            auth: false,
          },
        },
        {
          method: 'POST',
          path: '/api/s3/upload',
          options: {
            handler: controller.upload,
            description: 'Method to upload file to S3 bucket',
            auth: false,
          },
        },
        {
          method: 'DELETE',
          path: '/api/s3/delete',
          options: {
            handler: controller.delete,
            description: 'Method to delete file from S3 bucket',
            auth: false,
          },
        },
      ]);
      logger.info('Completed - S3 File Upload routes');
      resolve();
    });
  }
}
