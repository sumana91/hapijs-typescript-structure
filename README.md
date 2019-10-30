## hapijs-typescript-structure
![image](https://user-images.githubusercontent.com/21328393/67849796-2ab33b00-fb2d-11e9-9f90-fa5142f75998.png)
![image](https://user-images.githubusercontent.com/21328393/67850036-9a292a80-fb2d-11e9-955d-afee79084dc8.png)

This is a sample project on Hapijs framework, which uses typescript and MySQL database. Sample endpoints are created in this structure, which supports S3 file upload and CRUD operations on 'Question' repository in MySQL db.
'Question' is a sample repository created to test CRUD operations.

## Requirements

- NodeJS > 10.x
- Yarn > 1.x
- NPM > 5.x
- MySQL
- Typescript
- TypeORM

## How to use?

- Clone this project.
- Run `yarn install`
- Run `npm run nodemon:start`
- Visit [http://localhost:8080/api/questions](http://localhost:8080/api/questions) to test the REST API.
- Visit [http://localhost:8080/api/s3](http://localhost:8080/api/s3) to test the REST API.

## Set of Endpoints implemented
#### CURD on Question repository
- To create question: /api/questions/create. Give the question details in the body.  
  Method : POST  
- To get questions: /api/questions  
  Method : GET  
- To get question by id: /api/questions/{id}  
  Method : GET  
- To update a question : /api/questions/update/{id}  
  Method : PUT  
- To delete a question: /api/questions/delete/{id}  
  Method : DELETE    

#### AWS S3 File upload endpoints  
- To get a file from S3: /api/s3/get/{file}  
  Method: GET  
- To get all the files from S3: /api/s3/list  
  Method: GET  
- To upload a file to S3: /api/s3/upload  
  Method: POST  
- To delete a file from S3: /api/s3/delete  
  Method: DELETE  

## AWS and DB Confiugurations

Change the DB connection details and AWS configurations in config.ts file.

## DB scripts location

- `src/db/scripts/**`
