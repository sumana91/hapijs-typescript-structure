import { Question } from './question.entity';
import { BaseController } from '../../common/base/base.controller';
import { QuestionService } from './question-service';
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import logger from '../../helper/logger';
import newResponse from '../../helper/response';

export default class QuestionController extends BaseController<Question> {
	constructor(
		public readonly questionService: QuestionService
	) {
		super(questionService)
	}

	//Test
	public getByField = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			logger.info(`GET - ${request.url.href}`);
			let result = await this.questionService.getByField('text', request.params.text);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};
}
