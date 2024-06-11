export const corsOptions = {
  credentials: true,
  origin: true,
  methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200,
};


export const disbaledSwagger = {
  info: {
    title: 'Reward Roots API docs',
    version: '0.0.1',
    description: 'API docs are OFF for RewardRoot project.',
    contact: {
      name: 'Rewardroot',
      email: process.env.EMAIL_SENDER_EMAIL ?? "",
      url: 'https://www.rewardroot.com',
    },
    // license: {
    //   name: 'BSUL',
    //   url: 'https://www.example.com/license',
    // },
  },
  securityDefinitions: {
    BasicAuth: {
      type: 'basic',
    },
  },
};