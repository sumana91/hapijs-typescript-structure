import * as Hapi from '@hapi/hapi';
import { UserController } from './user-controller';
import logger from '../../helper/logger';
import IRoute from '../../helper/route';
import validate from './user-validate';
import { AWSService } from '../../common/aws/aws-services';
import { User } from './user.entity';
import { getManager } from 'typeorm';
import { UserService } from './user-service';

export default class UserRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      logger.info('Started - User routes');
      let userRepo = getManager().getRepository(User);
      let userService = new UserService(userRepo);
      const controller = new UserController(userService, new AWSService());
      server.route([
        {
          method: 'POST',
          path: '/api/users/create',
          options: {
            handler: controller.create,
            description: 'Method to add a user.',
            auth: false,
          },
        },
        {
          method: 'POST',
          path: '/api/users/addUsers',
          options: {
            handler: controller.addUsers,
            description: 'Method to upload multiple users.',
            auth: false,
          },
        },
        {
          method: 'DELETE',
          path: '/api/users/delete/{id}',
          options: {
            handler: controller.delete,
            validate: validate.deleteById,
            description: 'Method that deletes a user by its id.',
            auth: false,
          },
        },
        {
          method: 'GET',
          path: '/api/users',
          options: {
            handler: controller.getUsers,
            description: 'Method to list users',
            auth: false,
          },
        },
        {
          method: 'PUT',
          path: '/api/users/{id}',
          options: {
            handler: controller.update,
            validate: validate.updateById,
            description: 'Method to update a user by its id.',
            auth: false,
          },
        },
      ]);
      logger.info('Completed - User routes');
      resolve();
    });
  }
}