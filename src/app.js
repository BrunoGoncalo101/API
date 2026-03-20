import express from "express";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express"
import productRoutes from "./routes/products.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";
import swaggerSpec from "./config/swagger.js";

const app = express();

// Configura o CORS para permitir requisições de qualquer origem
app.use(
  cors({
    origin: "*",
  }),
);

connectDB();

// middleware para JSON
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("API a funcionar");
});

// rotas da aplicação
app.use("/api/v1/products", productRoutes);

// Configuração do Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// middleware para lidar com rotas não encontradas
app.use(notFoundMiddleware);
//envia a resposta de erro para o cliente
app.use(errorMiddleware);

export default app;



