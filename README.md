## Requirements

- NodeJS > 10.x
- Yarn > 1.x
- NPM > 5.x
- MySQL

## How to use?

1. Clone this project.
2. Run `yarn install`
3. Run `npm run nodemon:start`
4. Visit [http://localhost:8080/api/questions](http://localhost:8080/api/questions) to test the REST API.
5. Visit [http://localhost:8080/api/s3](http://localhost:8080/api/s3) to test the REST API.

## AWS and DB Confiugurations

Change the DB connection details and AWS configurations in config.ts file.

## DB scripts location

- `src/db/scripts/**`
