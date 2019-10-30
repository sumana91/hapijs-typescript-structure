import { Repository } from 'typeorm';
import { BaseService } from '../../common/base/base.service';
import { User } from './user.entity';

export class UserService extends BaseService<User> {
	constructor(
		public readonly userRepository: Repository<User>) {
		super(userRepository);
	}

	public async getByField(field: string, fieldValue: string): Promise<User> {
		let obj = {};
		obj[field] = fieldValue;
		try {
			return await this.userRepository.findOne(obj);
		} catch (error) {
			throw error;
		}
	}
}