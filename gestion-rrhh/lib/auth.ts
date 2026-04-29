import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function login(username: string, pass: string) {
  // Verificación contra variables de entorno (Invisibilidad Total)
  if (username !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return false;
  }

  // Creamos el Token
  const token = await new SignJWT({ user: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Sesión de 2 horas
    .sign(SECRET);

  // Guardamos en Cookie HTTP-only (No accesible desde JS del cliente)
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return true;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}