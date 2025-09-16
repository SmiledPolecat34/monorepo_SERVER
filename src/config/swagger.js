import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de mon projet JS efrei",
      version: "2.0.0",
      description:
        "Cette API permet de gérer des utilisateurs et leurs contacts.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Contact: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            phone: {
              type: "string",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
          },
        },
        Auth: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
            token: {
              type: "string",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/authentication/Auth.js", "./src/routes/*.js"], // chemin vers les fichiers avec des annotations Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
