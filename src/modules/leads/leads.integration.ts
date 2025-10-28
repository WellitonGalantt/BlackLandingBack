import { LeadsException } from "./leads.exception";
import { IIntegrationRes, ILead } from "./leads.types";
import dotenv from "dotenv";
dotenv.config();

//Integracao com n8n, envia os dados do lead para o n8n
export async function leadIntegrationN8n(date: ILead): Promise<void> {
  try {
    const webhookUrl = process.env.WEBHOOK_URL ?? "";
    // WEBHOOK do n8n que automatiza mensagens e planilha
    console.log("Webhook URL:", process.env.WEBHOOK_URL);
    console.log(webhookUrl)
    const res = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(date),
    });

    //resposta
    // {
    //     "sucess": false ou true,
    //     "message": "Esse email ja esta registrado!"
    // }
    const json = await res.json();
    console.log("Result Fetch Back", json);

    // Se for false eu gero uma excessao para tratar no controller
    if (!json.sucess) {
      throw new LeadsException(json.message);
    }

    return;
  } catch (err: any) {
    throw new LeadsException(err.message);
  }
}
