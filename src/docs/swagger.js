
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'E-Commerce API',
        version: '1.0.0',
        description: 'Backend Case of Avante Tech JR',
    },
    servers: [
        {
        url: 'http://localhost:3000',
        description: 'Development server',
        },
    ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;