export default {
  swagger: {
    options: {
      jsonEditor: true,
      info: {
        title: 'API Documentation',
        version: 'v1.0.0',
        contact: {
          name: '',
          email: '',
        },
      },
      grouping: 'tags',
      sortEndpoints: 'ordered',
    },
  },
  status: {
    options: {
      path: '/status',
      title: 'API Monitor',
      routeConfig: {
        auth: false,
      },
    },
  },
  awsConfig: {
    accessKeyId: "<>",
    secretAccessKey: "<>",
    region: "<>"
  },
  dbConfig: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "<username>",
    password: "<password>",
    database: "<database>",
    entities: "**/**.entity{.ts,.js}"
  },
  bucketName: "<bucket-name>"
};
