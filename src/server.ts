import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import alunoRouter from "./routes/alunoRoutes";
import router from "./routes/authRoutes";
import recursoRoutes from "./routes/recursoRoutes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/aluno", alunoRouter);
app.use("/auth", router);
app.use("/api/recursos", recursoRoutes);

const port = 3001;
app.listen(port, () => {
    console.log("Servidor de API rodando")
})