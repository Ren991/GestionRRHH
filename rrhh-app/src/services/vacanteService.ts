import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const createVacante = async (vacante: any) => {
  return await addDoc(collection(db, "vacantes"), {
    ...vacante,
    activa: true,
    fechaCreacion: new Date(),
    slug: vacante.titulo.toLowerCase().replace(/ /g, "-")
  });
};