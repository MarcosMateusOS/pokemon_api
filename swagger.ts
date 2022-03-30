const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/controllers/*.js'];

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'Pokemon Api', // by default: 'REST API'
    description: '', // by default: ''
  },
  host: 'localhost:8080', // by default: 'localhost:3000'
  basePath: '/', // by default: '/'
  schemes: ['htttp'], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: 'Upload', // Tag name
      description: 'Endpoint de Upload', // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./src/index.ts'); // Your project's root file
});
