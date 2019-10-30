import * as Hapi from '@hapi/hapi';

interface IRoute {
  register(server: Hapi.Server): Promise<any>;
}

export interface IAudioRequest {
  payload: {
    audioBase64: string;
  };
}

export interface IQuestionRequest {
  payload: {
    question: string;
  };
}

export interface IUserRequest {
  payload: {
    email: string;
  };
}

export default IRoute;
