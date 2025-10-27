import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    // Validar o corpo da request, se for sucesso retorna sicess e os dados, se nao retorna error e o erro
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(422).json({
        error: "validation_error",
        // Formata os erros de forma organizada e facil de entender
        details: parsed.error.flatten(), // fieldErrors, formErrors
      });
    }
    req.body = parsed.data; // corpo já tipado/normalizado
    // Passa para o proximo middleware
    next();
  };

  // valida → bloqueia se inválido
  // controller roda se válido
