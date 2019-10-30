import { BaseEntity } from './base.entity';
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import logger from '../../helper/logger';
import newResponse from '../../helper/response';
import { BaseService } from './base.service';

//Base controller endpoints
export class BaseController<T extends BaseEntity> {
	constructor(private readonly baseService: BaseService<T>) { }

	//GET all the entries 
	public getAll = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			logger.info(`GET - ${request.url.href}`);
			let result = await this.baseService.getAll();
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	//GET by id
	public getById = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let result = await this.baseService.get(id);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			logger.error(error.message);
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public create = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			let result = await this.baseService.create(request.payload);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			logger.error(error.message);
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public update = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let updatedEntity = await this.baseService.update(id, request.payload);
			if (!updatedEntity) {
				return toolkit.response(newResponse(request, { boom: Boom.notFound() }));
			}
			return toolkit.response(newResponse(request, { value: updatedEntity }));
		} catch (error) {
			logger.error(error.message);
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};

	public delete = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id: any = encodeURIComponent(request.params.id);
			let result = await this.baseService.delete(id);
			if (result) {
				return toolkit.response(newResponse(request, { value: result }));
			}
		} catch (error) {
			logger.error(error.message);
			return toolkit.response(newResponse(request, { boom: Boom.badImplementation(error) }));
		}
	};
}
