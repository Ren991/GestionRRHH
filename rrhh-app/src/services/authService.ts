import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};