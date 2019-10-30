import * as Hapi from '@hapi/hapi';
import QuestionRoutes from './api/question/question-routes';
import logger from './helper/logger';
import UploadRoute from './api/s3-upload/upload-route';
import UserRoutes from './api/user/user-routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    logger.info('Router - Started adding routes')
    await new QuestionRoutes().register(server);
    await new UploadRoute().register(server);
    await new UserRoutes().register(server);
    logger.info('Router - Completed adding routes');
  }
}
