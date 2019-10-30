export default {
  swagger: {
    options: {
      jsonEditor: true,
      info: {
        title: 'API Documentation',
        version: 'v1.0.0',
        contact: {
          name: 'John doe',
          email: 'johndoe@johndoe.com',
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
    accessKeyId: "AKIAJB4RRTW4QTDBHDKQ",
    secretAccessKey: "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",
    region: "us-east-1",
    EmailConfiguration: {
      EmailSendingAccount: "DEVELOPER",
      SourceArn: "arn:aws:ses:us-east-1:701271335692:identity/app.test@rivetsys.com"
    },
    cognitoUserPoolId: "us-east-1_NKag3VSoQ"
  },
  dbConfig: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "hapisample",
    password: "hapisample",
    database: "interviewr",
    entities: "**/**.entity{.ts,.js}"
  },
  bucketName: "rivet-interviewr"
};
