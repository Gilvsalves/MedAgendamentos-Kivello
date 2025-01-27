import express from "express"
import cors from "cors"
import userRoutes from "./routes/users.js"

const app = express()

app.use(express.json())

// Configure CORS para permitir requisições do front-end
app.use(cors({
  origin: 'http://localhost:8100', // ou o endereço do seu front-end, se diferente
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use("/", userRoutes)

// Porta do servidor
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});