import { z } from "zod";

export const VacanteSchema = z.object({
  titulo: z.string().min(5, "El título es muy corto").max(100),
  seniority: z.enum(["Junior", "Ssr", "Senior", "Expert"]),
  descripcion: z.string().min(20, "Danos un poco más de detalle en la descripción"),
  fecha_cierre: z.string().refine((date) => new Date(date) > new Date(), {
    message: "La fecha de cierre debe ser en el futuro",
  }),
});