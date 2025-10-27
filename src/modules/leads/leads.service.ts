import { LeadsException } from "./leads.exception";
import { leadIntegrationN8n } from "./leads.integration";
import { IIntegrationRes, ILead } from "./leads.types";

// Service é onde tem as validacoes, tratamentos, formatacoes...
// Utilizando os contratos(Interfaces) ou funcoes externas de formatacao ou validacao...
// Depois manda para o repoository que salavo no banco de dados ou retorna erro que vai ser tratado pelo controller
// Utilizar as exception para poder tratar os erros no controller
export class LeadsService {
  public static async sendDate(date: ILead): Promise<void> {
    const result = await leadIntegrationN8n(date);
    return;
  }
}
