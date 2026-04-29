"use server"
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

// El primer parámetro es 'prevState', requerido por useFormState
export async function handleLogin(prevState: any, formData: FormData) {
  const user = formData.get("user") as string;
  const pass = formData.get("pass") as string;

  const isOk = await login(user, pass);

  if (isOk) {
    console.log("entro")
    redirect("/admin");
  } else {
    return { error: "Las credenciales no coinciden." };
  }
}