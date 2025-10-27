import { z } from "zod";

export const leadsDateSchema = z.object({
    name: z.string().trim().min(4, "Nome deve ter pelo menos 4 caracteres!"), 
    email: z.string().trim().email("Digite um e-mail valido!"),
    phone: z.string().trim().min(11, "Digite um telefone valido!"),
    notification: z.coerce.boolean().optional().default(true), // corce aceirta true e false e tbm 1 e 0
    createdAt: z.date().default(new Date()),
})

// Tipo derivado do schema (ótimo para services/repos)
// Essa funcao transforma nosso schema em um type sem precisar criar uma interface ou uma classe
export type CreateLeadDTO = z.infer<typeof leadsDateSchema>;