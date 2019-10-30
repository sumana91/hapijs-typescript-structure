import * as Hapi from '@hapi/hapi';
import { AWSService } from '../../common/aws/aws-services';

export default class UploadController {
  constructor(public readonly awsService: AWSService) {}

  //Upload a file to S3
  public upload = async (request, toolkit: Hapi.ResponseToolkit) => {
    let response = null;
    await this.awsService.uploadFile(request.payload.file, request.payload.filename)
      .then((result) => {
        response = result;
      })
      .catch(err => {
        throw err.message;
      });
      return response;
  };

  //list all the files from S3
  public list = async () => {
    let response = null;
    await this.awsService
      .listFiles()
      .then(result => {
        response = result;
      })
      .catch(err => {
        throw err.message;
      });
      return response;
  };

  //Delete a file from S3
  public delete = async (request, toolkit: Hapi.ResponseToolkit) => {
    let response = null;
    await this.awsService
      .deleteFile(request.payload.file)
      .then(result => {
        response = result;
      })
      .catch(err => {
        throw err.message;
      });
      return response;
  };

  //Get a file from S3
  public get = async (request, toolkit: Hapi.ResponseToolkit) => {
    let response = null;
    let file = encodeURIComponent(request.params.file);
    await this.awsService
      .getFile(file)
      .then(result => {
        response = result;
      })
      .catch(err => {
        throw err.message;
      });
      return response;
  };
}
