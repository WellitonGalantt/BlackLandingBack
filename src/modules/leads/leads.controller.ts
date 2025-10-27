import { Request, Response } from "express";
import { IIntegrationRes, ILead } from "./leads.types";
import { LeadsService } from "./leads.service";
import { LeadsException } from "./leads.exception";
import { failed, success } from "../../shared/utils/request.res";

export class LeadsController {
  public static get(req: Request, res: Response): void {
    // Esse erro nao para a aplicaçao por cotna da rota que captura o erro em server.ts
    throw new LeadsException("Erro de leads!");
    res.send("Leads");
    return;
  }

  public static async sendDate(
    req: Request<{}, {}, ILead>,
    res: Response
  ): Promise<void> {
    try {
      await LeadsService.sendDate(req.body);
      success(res, "Lead enviado com sucesso!", null);

    } catch (err: any) {
      failed(res, err.message);
      return;
    }
    return;
  }
}
