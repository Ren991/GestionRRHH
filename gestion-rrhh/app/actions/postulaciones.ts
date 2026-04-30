"use server"

import { turso } from "@/lib/turso";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { InArgs } from "@libsql/client";


export async function enviarPostulacion(prevState: any, formData: FormData) {
  const headerList = await headers();
  // Obtenemos la IP para el Rate Limit (3 por día)
  const ip = headerList.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  

  // Extraemos los campos necesarios para las validaciones iniciales
  const email = formData.get("email") as string;
  const vacanteId = formData.get("vacanteId") as string;

  try {

    // VALIDACION POR MAIL
    const { rows: existingMail } = await turso.execute({
      sql: `SELECT id FROM postulaciones 
            WHERE email = ? AND vacante_id = ?`,
      args: [email, vacanteId]
    });

    if (existingMail.length > 0) {
      return { error: "Ya existe una postulación registrada con este correo para esta vacante." };
    }
    // 1. Rate Limit Check: Contamos envíos de esta IP en las últimas 24hs
    const { rows } = await turso.execute({
      sql: `SELECT COUNT(*) as count FROM postulaciones 
            WHERE ip_address = ? AND fecha_postulacion > date('now', '-1 day')`,
      args: [ip]
    });

    if (Number(rows[0].count) >= 3) {
      return { error: "Límite diario alcanzado (máximo 3 postulaciones). ¡Intentá mañana!" };
    }

    // 2. Procesamiento del Archivo (PDF a Buffer para BLOB)
    const file = formData.get("cv_archivo") as File;
    if (!file || file.size === 0) return { error: "El archivo CV es obligatorio." };
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Preparación de argumentos para evitar errores de tipado
    const sqlArgs: InArgs = [
      uuidv4(),
      formData.get("vacanteId") as string,
      formData.get("nombre") as string,
      formData.get("email") as string,
      formData.get("puesto") as string,
      formData.get("linkedin") as string,
      formData.get("portfolio") as string,
      parseFloat(formData.get("remuneracion") as string) || 0,
      buffer, // El binario para la columna BLOB
      ip,
      formData.get("ubicacion_candidato") as string,

    ];

    // 4. Inserción en Turso
    await turso.execute({
      sql: `INSERT INTO postulaciones (
              id, 
              vacante_id, 
              nombre, 
              email, 
              puesto_actual, 
              linkedin, 
              portfolio, 
              remuneracion_bruta, 
              cv_blob, 
              ip_address, 
              ubicacion_candidato,
              estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente')`, // 11 signos '?' + el estado fijo
      args: sqlArgs
    });

    revalidatePath("/admin/postulaciones");
    return { success: true };

  } catch (e) {
    console.error("Error :", e);
    return { error: "Hubo un fallo técnico al procesar tu postulación." };
  }
}

/**
 * Actualiza el estado de una postulación (Solo Admin)
 */
export async function actualizarEstadoPostulacion(id: string, nuevoEstado: string) {
  try {
    await turso.execute({
      sql: "UPDATE postulaciones SET estado = ? WHERE id = ?",
      args: [nuevoEstado, id]
    });
    revalidatePath("/admin/postulaciones");
    return { success: true };
  } catch (e) {
    return { error: "No se pudo actualizar el estado del candidato." };
  }
}

/**
 * Recupera el CV para descarga (Solo Admin)
 */
export async function descargarCV(id: string) {
  try {
    const { rows } = await turso.execute({
      sql: "SELECT cv_blob, nombre FROM postulaciones WHERE id = ?",
      args: [id]
    });

    const registro = rows[0];
    if (!registro || !registro.cv_blob) return null;

    // Convertimos el BLOB (binario) a Base64 para que el cliente lo descargue
    const buffer = Buffer.from(registro.cv_blob as ArrayBuffer);
    
    return {
      base64: buffer.toString('base64'),
      filename: `CV_${(registro.nombre as string).replace(/\s+/g, '_')}.pdf`,
      contentType: 'application/pdf'
    };
  } catch (e) {
    console.error("Error al descargar CV:", e);
    return null;
  }
}

/**
 * Elimina físicamente una postulación de la base de datos
 */
export async function eliminarPostulacion(id: string) {
  try {
    await turso.execute({
      sql: "DELETE FROM postulaciones WHERE id = ?",
      args: [id]
    });

    // Revalidamos para que la tabla se actualice al toque
    revalidatePath("/admin/postulaciones");
    return { success: true };
  } catch (e) {
    console.error("Error al eliminar:", e);
    return { error: "No se pudo eliminar la postulación. Intentalo de nuevo." };
  }
}