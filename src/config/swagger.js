
import swaggerJSDoc from "swagger-jsdoc";

import { writeFileSync } from "fs";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API REST para gestão de produtos",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Teclado",
            },
            price: {
              type: "number",
              example: 29.99,
            },
          },
        },
        ProductInput: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: {
              type: "string",
              example: "Teclado",
            },
            price: {
              type: "number",
              example: 29.99,
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;


// 👉 Cria o ficheiro físico swagger.json
writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));

console.log("swagger.json gerado com sucesso!")
