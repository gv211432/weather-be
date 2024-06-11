import swaggerJSDoc from "swagger-jsdoc";

const generateSwaggerDefinition = () => {
  return {
    info: {
      title: 'Weather API docs',
      version: '0.0.1',
      description: 'This is an API doc for test project weather-be.',
    },
    securityDefinitions: {
      BasicAuth: {
        type: 'basic',
      },
    },
    // Add any other configurations or paths dynamically if needed
  };
};

const generateSwaggerOptions = () => {
  return {
    swaggerDefinition: generateSwaggerDefinition(),
    apis: ['./src/api/**/*.ts'],
  };
};

const swaggerSpec = swaggerJSDoc(generateSwaggerOptions());

export default swaggerSpec;
