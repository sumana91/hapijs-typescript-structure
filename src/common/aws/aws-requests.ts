import * as aws from 'aws-sdk';

//Admin create User in Cognito
export class AdminCreateUserRequest implements aws.CognitoIdentityServiceProvider.Types.AdminCreateUserRequest {
	UserPoolId: any;
	DesiredDeliveryMediums: [];
	Username: any;
	UserAttributes: any;
	ForceAliasCreation: true;
}

//Admin delete User in Cognito
export class AdminDeleteUserRequest implements aws.CognitoIdentityServiceProvider.Types.AdminDeleteUserRequest {
	UserPoolId: any;
	Username: any;
}

//Confirm Signup of User in Cognito
export class ConfirmSignUpRequest implements aws.CognitoIdentityServiceProvider.Types.ConfirmSignUpRequest {
	ClientId: any;
	Username: any;
	ConfirmationCode: any;
}

//Create UserPool Client app in Cognito
export class CreateUserPoolClientRequest
	implements aws.CognitoIdentityServiceProvider.Types.CreateUserPoolClientRequest {
	ClientName: any;
	UserPoolId: any;
}

//Create USerPool in Cognito
export class CreateUserPoolRequest implements aws.CognitoIdentityServiceProvider.Types.CreateUserPoolRequest {
	PoolName: any;
    UsernameAttributes: any;
    LambdaConfig: any;
	Schema: any;
	Policies: any;
	EmailConfiguration: any;
	AutoVerifiedAttributes: any;
	AdminCreateUserConfig: any;
}

//Delete UserPool in Cognito
export class DeleteUserPoolRequest implements aws.CognitoIdentityServiceProvider.Types.DeleteUserPoolRequest {
	UserPoolId: string;
}

//List UserPools from Cognito
export class ListUserPoolsRequest implements aws.CognitoIdentityServiceProvider.Types.ListUserPoolsRequest {
	MaxResults: number;
}

//List Users from UserPool from Cognito
export class ListUsersRequest implements aws.CognitoIdentityServiceProvider.Types.ListUsersRequest {
	UserPoolId: string;
}

//Update User attributes in UserPool in Cognito
export class AdminUpdateUserAttributesRequest implements aws.CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest {
	UserAttributes: any;
	UserPoolId: string;
	Username: string;
}
