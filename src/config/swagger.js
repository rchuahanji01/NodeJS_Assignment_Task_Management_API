const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'Task Management REST API Documentation'
    },

    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

 // apis: ['./src/routes/*.js'] 
 apis: [
  './src/routes/*.js',
  './src/docs/swagger.js'
]

};

module.exports = swaggerJSDoc(options);
