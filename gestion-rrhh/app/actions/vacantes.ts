"use server"
import { turso } from "@/lib/turso";
import { VacanteSchema } from "@/lib/validations";
import { v4 as uuidv4 } from "uuid";
import slugify from "slug";
import { revalidatePath } from "next/cache";

export async function crearVacante(prevState: any, formData: FormData) {
  // 1. Extraer datos
  const data = {
    titulo: formData.get("titulo"),
    seniority: formData.get("seniority"),
    descripcion: formData.get("descripcion"),
    fecha_cierre: formData.get("fecha_cierre"),
  };

  // 2. Validar con Zod
  const result = VacanteSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // 3. Preparar datos para Turso
  const id = uuidv4();
  const slug = `${slugify(result.data.titulo)}-${id.substring(0, 5)}`;

  try {
    await turso.execute({
      sql: `INSERT INTO vacantes (id, titulo, seniority, descripcion, slug, fecha_cierre, activa) 
            VALUES (?, ?, ?, ?, ?, ?, 1)`,
      args: [id, result.data.titulo, result.data.seniority, result.data.descripcion, slug, result.data.fecha_cierre]
    });

    revalidatePath("/admin/vacantes");
    return { success: true };
  } catch (e) {
    return { error: "Error de base de datos" };
  }
}