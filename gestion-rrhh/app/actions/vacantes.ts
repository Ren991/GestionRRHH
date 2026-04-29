"use server"
import { turso } from "@/lib/turso";
import { VacanteSchema } from "@/lib/validations";
import { v4 as uuidv4 } from "uuid";
import slugify from "slug";
import { revalidatePath } from "next/cache";

export async function crearOEditarVacante(prevState: any, formData: FormData) {
  const idExistente = formData.get("id") as string | null; // Detectamos si hay ID
  
  const data = {
    titulo: formData.get("titulo"),
    seniority: formData.get("seniority"),
    descripcion: formData.get("descripcion"),
    fecha_cierre: formData.get("fecha_cierre"),
  };

  const result = VacanteSchema.safeParse(data);
  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  try {
    if (idExistente) {
      // Lógica de EDICIÓN
      await turso.execute({
        sql: `UPDATE vacantes SET titulo = ?, seniority = ?, descripcion = ?, fecha_cierre = ? WHERE id = ?`,
        args: [result.data.titulo, result.data.seniority, result.data.descripcion, result.data.fecha_cierre, idExistente]
      });
    } else {
      // Lógica de CREACIÓN
      const id = uuidv4();
      const slug = `${slugify(result.data.titulo)}-${id.substring(0, 5)}`;
      await turso.execute({
        sql: `INSERT INTO vacantes (id, titulo, seniority, descripcion, slug, fecha_cierre, activa) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        args: [id, result.data.titulo, result.data.seniority, result.data.descripcion, slug, result.data.fecha_cierre]
      });
    }

    revalidatePath("/admin/vacantes");
    return { success: true };
  } catch (e) {
    return { error: "Error en la base de datos" };
  }
}