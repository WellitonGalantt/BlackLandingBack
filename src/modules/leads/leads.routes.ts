import { Request, Response } from "express";
import { LeadsController } from "./leads.controller";
import { validate } from "../../shared/http/middlewares/leadsDate.middleware";
import { leadsDateSchema } from "./lead.schemas";

const leadsRoutes = require("express").Router();

leadsRoutes.get("/", (req: Request, res: Response) => {
  LeadsController.get(req, res);
});

leadsRoutes.post(
  "/leads/",
  validate(leadsDateSchema),
  LeadsController.sendDate
);
export default leadsRoutes;
