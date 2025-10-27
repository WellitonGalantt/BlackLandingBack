import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import leadsRoutes from "./modules/leads/leads.routes";
import { rateLimit } from "express-rate-limit";
import { failed } from "./shared/utils/request.res";

const app = express();

// Trust proxy serve para aceitar um proxy na frente (Vercel/NGINX/API gateway);
app.set("trust proxy", 1);

// Morgan server para mostrar logs das requests do server;
app.use(morgan("tiny"));

app.use(express.json());

// Cors serve para permitir acesso do nosso back end para front end epecificos;
app.use(cors());

//Helemt serve para proteger nossa aplicação de brechas comuns que existem de forma automatica;
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 30, // 30 req/min por IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use("/api", leadsRoutes);

//Caso de algum erro na requisicao ele cai nessa rota
app.use((error: Error, req: Request, res: Response, Next: NextFunction) => {
  failed(res, error.message);
});

export default app;