import * as Hapi from '@hapi/hapi';
import newResponse from '../../helper/response';
import {
	AdminUpdateUserAttributesRequest,
	AdminCreateUserRequest, AdminDeleteUserRequest,
	ListUsersRequest
} from '../../common/aws/aws-requests';
import { AWSService } from '../../common/aws/aws-services';
import { IUserRequest } from '../../helper/route';
import { getManager } from 'typeorm';
import { User } from './user.entity';
import * as Boom from '@hapi/boom';
import config from '../../config';
import { BaseController } from '../../common/base/base.controller';
import { UserService } from './user-service';

export class UserController extends BaseController<User> { 
	constructor(
		public readonly userService: UserService,
		private readonly awsService: AWSService) {
		super(userService)
	}

	//Get cognito users by pool_id
	public getUsers = async (toolkit: Hapi.ResponseToolkit) => {
		try {
			let listUsersRequest = new ListUsersRequest();
			listUsersRequest.UserPoolId = config.awsConfig.cognitoUserPoolId;
			let users = await this.awsService.listUsers(listUsersRequest);
			if (users) {
				return users;
			}
		} catch (err) {
			return toolkit.response({ message: err.message });
		}
	}

	//Create user
	public create = async (entity: any) => {
		try {
			await this.validateEmail(entity.payload.email);
			let user = await this.upload(entity.payload);
			 return entity;
		} catch (err) {
			throw err;
		}
	}

	//Add users
	public addUsers = async (request) => {
		let users = request.payload;
		await this.validateEmail(request.payload.email);
		return Promise.all(
			users.map(async userItem => {
				let user = await this.upload(userItem);
				if (user) {
					return new Promise(resolve => {
						resolve(user);
					});
				}
			})).then(users => {
				return users;
			});
	}

	async upload(user): Promise<any> {
		return await this.createCognitoUser(user)
			.then(async userData => {
				user.cognito_user_id = userData.User.Username;
				let repo = getManager().getRepository(User);
				let newUser = await repo.save(user as any)
				if (newUser) {
					return newUser;
				} else {
					return { message: "Error while adding user" };
				}
			})
			.catch(err => {
				console.log("err::", err);
				user.status = err.message = 'An account with the given email already exists.'
					? 'An account already exists.'
					: err.message;
				return user;
			});
	}

	//Update user
	public updateUser = async(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id = encodeURIComponent(request.params.id);
			let user = await getManager().getRepository(User).findOne(id);
			if (!user) {
				return toolkit.response(newResponse(request, { boom: Boom.badImplementation("User not found") }));
			}
			await this.updateCognitoUser(user);
			let updatedUser = await getManager().getRepository(User).update(id, request.payload as any);
			if (updatedUser) {
				return {
					status: 200,
					message: "User Updated Successfully"
				};
			} else {
				return toolkit.response(newResponse(request, { boom: Boom.badImplementation("User update error") }));
			}
		} catch (err) {
			throw err;
		}
	}

	//Delete user
	public deleteUser = async (request, toolkit: Hapi.ResponseToolkit) => {
		try {
			const id = encodeURIComponent(request.params.id);
			let user = await getManager().getRepository(User).findOne(id);
			if (!user) {
				throw toolkit.response(newResponse(request, { boom: Boom.badImplementation("User does not exist") }));
			}
			await this.deleteCognitoUser(user.email);
			user.email = user.email + '_deleted';
			let result = await getManager().getRepository(User).delete(id);
			if (result) {
				return new Promise(resolve => {
					resolve({
						status: 200,
						message: "User deleted Successfully"
					});
				});
			} else {
				throw toolkit.response(newResponse(request, { boom: Boom.badImplementation("Error while deleting user") }));
			}
		} catch (err) {
			//this.logger.error(err);
			throw err;
		}
	}

	//Cognito delete
	private async deleteCognitoUser(email: string): Promise<any> {
		try {
			let adminDeleteUserRequest = new AdminDeleteUserRequest();
			adminDeleteUserRequest.UserPoolId = config.awsConfig.cognitoUserPoolId;
			adminDeleteUserRequest.Username = email;
			let awsData = await this.awsService.adminDeleteUser(adminDeleteUserRequest);
			return awsData;
		} catch (err) {
			throw err;
		}
	}

	//Cognito update role
	private async updateCognitoUser(user: any): Promise<any> {
		try {
			let adminUpdateUserAttributesRequest = new AdminUpdateUserAttributesRequest();
			adminUpdateUserAttributesRequest.UserPoolId = config.awsConfig.cognitoUserPoolId;
			adminUpdateUserAttributesRequest.Username = user.email;
			let userAttr = [
				{
					Name: 'custom:first_name',
					Value: user.first_name ? user.first_name : ''
				},
				{
					Name: 'custom:last_name',
					Value: user.last_name ? user.last_name : ''
				},
				{
					Name: 'custom:role',
					Value: user.role
				}
			];
			adminUpdateUserAttributesRequest.UserAttributes = userAttr;
			let updateResult = await this.awsService.updatePoolAttribute(adminUpdateUserAttributesRequest);
			return updateResult;
		} catch (err) {
			throw err;
		}
	}

	//Create cognito user
	private async createCognitoUser(user: any): Promise<any> {
		let adminCreateUserRequest = new AdminCreateUserRequest();
		adminCreateUserRequest.UserPoolId = config.awsConfig.cognitoUserPoolId;
		adminCreateUserRequest.Username = user.email;
		return await this.awsService
			.adminCreateUser(adminCreateUserRequest, user)
			.then(async userData => {
				return userData;
			})
			.catch(err => {
				throw err;
			});
	}

	private validateEmail(email: string): any {
		let regexp = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		if (regexp.test(email)) {
			return true;
		}
		return false;
	}
}
