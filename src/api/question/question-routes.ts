import * as Hapi from '@hapi/hapi';
import QuestionController from './question-controller';
import logger from '../../helper/logger';
import IRoute from '../../helper/route';
import validate from './question-validate';
import { QuestionService } from './question-service';
import { Question } from './question.entity';
import { getManager } from 'typeorm';

export default class QuestionRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(async (resolve) => {
      logger.info('Started - Question routes');
      let questionRepo = getManager().getRepository(Question);
      let questionService = new QuestionService(questionRepo);
      const controller = new QuestionController(questionService);

      server.route([
        {
          method: 'GET',
          path: '/api/questions',
          options: {
            handler: controller.getAll,
            description: 'Method that gets all questions.',
            auth: false,
          },
        },
        {
          method: 'GET',
          path: '/api/questions/{id}',
          options: {
            handler: controller.getById,
            validate: validate.getById,
            description: 'Method to get a question by its id.',
            auth: false,
          },
        },
        {
          method: 'POST',
          path: '/api/questions/create',
          options: {
            handler: controller.create,
            validate: validate.create,
            description: 'Method to create a new question.',
            auth: false,
          },
        },
        {
          method: 'PUT',
          path: '/api/questions/update/{id}',
          options: {
            handler: controller.update,
            validate: validate.updateById,
            description: 'Method to update a question by its id.',
            auth: false,
          },
        },
        {
          method: 'DELETE',
          path: '/api/questions/delete/{id}',
          options: {
            handler: controller.delete,
            validate: validate.deleteById,
            description: 'Method that deletes a question by its id.',
            auth: false,
          },
        },
        {
          method: 'GET',
          path: '/api/questions/field/{text}',
          options: {
            handler: controller.getByField,
            description: 'Method to get an entry by any field',
            auth: false,
          },
        },
      ]);
      logger.info('Completed - Question routes');
      resolve();
    });
  }
}