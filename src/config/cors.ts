export const corsOptions = {
  credentials: true,
  origin: true,
  methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200,
};