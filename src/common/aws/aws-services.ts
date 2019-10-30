import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import {
	CreateUserPoolRequest,
	AdminCreateUserRequest,
	AdminDeleteUserRequest,
	ListUsersRequest,
	ConfirmSignUpRequest,
	DeleteUserPoolRequest,
	AdminUpdateUserAttributesRequest,
	ListUserPoolsRequest,
	CreateUserPoolClientRequest
} from './aws-requests';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import config from '../../config';

AWS.config.update({
	secretAccessKey: config.awsConfig.secretAccessKey,
	accessKeyId: config.awsConfig.accessKeyId,
	region: config.awsConfig.region
});

let bucketName = config.bucketName;

const s3 = new AWS.S3({
	params: { Bucket: this.bucketName }
});

let options = { partSize: 10 * 1024 * 1024, queueSize: 1 };  //Optional


export class AWSService {

	//list userPools
	public async listUserPools(listUserPoolsRequest: ListUserPoolsRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.listUserPools(listUserPoolsRequest)
			.promise()
			.then(userPools => {
				return userPools;
			})
			.catch(err => {
				throw err;
			});
	}

	//List the users from the UserPool
	public async listUsers(listUsersRequest: ListUsersRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.listUsers(listUsersRequest)
			.promise()
			.then(users => {
				return users;
			})
			.catch(err => {
				throw err;
			});
	}

	//Create UserPool
	public async createUserPool(createUserPoolRequest: CreateUserPoolRequest): Promise<any> {
		try {
			let poolParams = await this.populatePoolRequest(createUserPoolRequest);
			let serviceProvider = new AWS.CognitoIdentityServiceProvider();
			let userPool = await serviceProvider.createUserPool(poolParams).promise();
			return userPool;
		} catch (err) {
			throw err;
		}
	}

	//Create a User in UserPool
	public async adminCreateUser(adminCreateUserRequest: AdminCreateUserRequest, userItem: any): Promise<any> {
		try {
			let userParams = await this.populateCreateUserRequest(adminCreateUserRequest, userItem);
			let serviceProvider = new AWS.CognitoIdentityServiceProvider();
			let user = await serviceProvider.adminCreateUser(userParams).promise();
			return user;
		} catch (err) {
			throw err;
		}
	}

	//Delete a User in UserPool
	public async adminDeleteUser(adminDeleteUserRequest: AdminDeleteUserRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.adminDeleteUser(adminDeleteUserRequest)
			.promise()
			.then(response => {
				return response;
			})
			.catch(err => {
				throw err;
			});
	}

	//Delete a UserPool
	public async deleteUserPool(deleteUserPoolRequest: DeleteUserPoolRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.deleteUserPool(deleteUserPoolRequest)
			.promise()
			.then(response => {
				return response;
			})
			.catch(err => {
				return err;
			});
	}

	//Create app client
	public async createUserPoolClient(createUserPoolClientRequest: CreateUserPoolClientRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.createUserPoolClient(createUserPoolClientRequest)
			.promise()
			.then(client => {
				return client;
			})
			.catch(err => {
				throw err;
			});
	}

	//Update UserPool Attributes
	public async updatePoolAttribute(adminUpdateUserAttributesRequest: AdminUpdateUserAttributesRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.adminUpdateUserAttributes(adminUpdateUserAttributesRequest)
			.promise()
			.then(user => {
				return user;
			})
			.catch(err => {
				throw err;
			});
	}

	//Admin User Cognito Sign up
	public async signUp(authenticationData: any, poolData: any): Promise<any> {
		var userPool = new CognitoUserPool(poolData);
		var attributeList = [];
		let dataEmail = {
			Name: "email",
			Value: authenticationData.Username
		};
		let userRole = {
			Name: "custom:role",
			Value: authenticationData.UserRole
		};
		var attributeEmail = new CognitoUserAttribute(dataEmail);
		attributeList.push(attributeEmail);
		attributeList.push(userRole);
		return new Promise(resolve => {
			userPool.signUp(authenticationData.Username, authenticationData.Password, attributeList, null, function (
				err,
				result
			) {
				if (err) {
					return resolve(err);
				} else {
					return resolve(result);
				}
			});
		});
	}

	//Confirm user SignUp
	public async confirmSignUp(confirmSignUpRequest: ConfirmSignUpRequest): Promise<any> {
		let serviceProvider = new AWS.CognitoIdentityServiceProvider();
		return await serviceProvider
			.confirmSignUp(confirmSignUpRequest)
			.promise()
			.then(clientData => {
				return clientData;
			})
			.catch(err => {
				throw err;
			});
	}

	//Create UserPool request
	async populatePoolRequest(createUserPoolRequest: CreateUserPoolRequest) {
		try {
			let userPoolCreation = await this.getData('userPoolCreation.json');
			let userPoolCreationData = JSON.parse(userPoolCreation);
			createUserPoolRequest.Schema = userPoolCreationData.Schema;
			createUserPoolRequest.Policies = userPoolCreationData.Policies;
			createUserPoolRequest.UsernameAttributes = userPoolCreationData.UsernameAttributes;
			createUserPoolRequest.AutoVerifiedAttributes = userPoolCreationData.AutoVerifiedAttributes;
			createUserPoolRequest.EmailConfiguration = config.awsConfig.EmailConfiguration;
			createUserPoolRequest.AdminCreateUserConfig = userPoolCreationData.AdminCreateUserConfig;
			return createUserPoolRequest;
		} catch (err) {
			throw err;
		}
	}

	//Create AdminCreateUserRequest
	async populateCreateUserRequest(adminCreateUserRequest: AdminCreateUserRequest, userItem: any) {
		try {
			let userCreation = await this.getData('userCreation.json');
			let userCreationData = JSON.parse(userCreation);
			adminCreateUserRequest.DesiredDeliveryMediums = userCreationData.DesiredDeliveryMediums;
			adminCreateUserRequest.ForceAliasCreation = userCreationData.ForceAliasCreation;
			let userData = userCreationData.UserAttributes;
			userData.forEach(userRow => {
				let key = userRow['Name'].replace('custom:', '');
				if (userItem[key] && userItem[userRow['Value']] != '') {
					userRow['Value'] = userItem[key];
				}
			});
			adminCreateUserRequest.UserAttributes = userData;
			return adminCreateUserRequest;
		} catch (err) {
			throw err;
		}
	}

	//Read from the file and return the file
	getData(filename: any): Promise<any> {
		let promise = new Promise(function (resolve) {
			fs.readFile(path.join(__dirname, './meta/' + filename), 'utf8', function (err, data) {
				if (err) throw err;
				return resolve(data);
			});
		});
		return promise;
	}

	//Upload a file to S3
	public async uploadFile(file: any, filename: string) {
		let response = null;
		const params = { Bucket: bucketName, Key: 'folder_1/folder_2/' + filename, Body: file };
		await s3.upload(params, options).promise().then((result) => {
			response = result;
		}).catch((err) => {
			throw err;
		});
		return response;
	};

	//Delete a file from S3
	public async deleteFile(file: any) {
		let response = null;
		const params = { Bucket: bucketName, Key: file };
		await s3.deleteObject(params).promise().then((result) => {
			response =  result;
		}).catch((err) => {
			throw err;
		});
		return { message: "File deleted Successfully", response};
	};

	//List the files from S3
	public async listFiles() {
		let response = null;
		const params = { Bucket: bucketName };
		await s3.listObjects(params).promise().then((result) => {
			response =  result;
		}).catch((err) => {
			throw err;
		});
		return response;
	};

	//Get a specific file from S3
	public async getFile(file: any) {
		let response = null;
		const params = { Bucket: bucketName, Key: file };
		await s3.getObject(params).promise().then((result) => {
			response =  result;
		}).catch((err) => {
			throw err;
		});
		return response;
	};
}
