import { Repository } from 'typeorm';
import { IBaseService } from './base.interface';
import { BaseEntity } from './base.entity';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
	constructor(public readonly genericRepository: Repository<T>) {
	}

	//Get all the entries
	public async getAll(): Promise<T[]> {
		try {
			return await this.genericRepository.find();
		} catch (error) {
			throw error;
		}
	}	

	//Get an entry by its id
	public async get(id: number): Promise<T> {
		try {
			return await this.genericRepository.findOne({where: {id: id}});
		} catch (error) {
			throw error;
		}
	}

	//Create an entry
	public async create(entity: any): Promise<T> {
		try {
			return await this.genericRepository.save(entity);
		} catch (error) {
			throw error;
		}
	}

	//Update an entry
	public async update(id: number, entity: any): Promise<any> {
		try {
			entity.modified_date = new Date();
			return await this.genericRepository.update(id, entity);
		} catch (error) {
			throw error;
		}
	}

	//Soft delete an entry
	public async softDelete(id: number, entity: any): Promise<any> {
		try {
			entity.modified_date = new Date();
			return await this.genericRepository.update(id, entity);
		} catch (error) {
			throw error;
		}
	}


	//delete an entry
	public async delete(id: number): Promise<any> {
		try {
			return await this.genericRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
