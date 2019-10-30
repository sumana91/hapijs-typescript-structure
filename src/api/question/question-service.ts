import { Repository } from 'typeorm';
import { BaseService } from '../../common/base/base.service';
import { Question } from './question.entity';

export class QuestionService extends BaseService<Question> {
	constructor(
		public readonly questionRepository: Repository<Question>) {
		super(questionRepository);
	}

	public async getByField(field: string, fieldValue: string): Promise<Question> {
		let obj = {};
		obj[field] = fieldValue;
		try {
			return await this.questionRepository.findOne(obj);
		} catch (error) {
			throw error;
		}
	}
}