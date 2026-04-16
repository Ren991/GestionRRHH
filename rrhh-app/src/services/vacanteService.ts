import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export interface Vacante {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  seniority: string;
}

const generateSlug = (titulo: string) => {
  return titulo
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // espacios → guiones
    .replace(/[^\w-]+/g, "")     // limpia caracteres raros
};

export const createVacante = async (vacante: Vacante) => {
  const newVacante = {
    ...vacante,
    activa: true,
    fechaCreacion: new Date(),
    fechaCierre: null,
    slug: generateSlug(vacante.titulo)
  };

  const docRef = await addDoc(collection(db, "vacantes"), newVacante);

  return {
    id: docRef.id,
    ...newVacante
  };
};

export const getVacantes = async () => {
  const snapshot = await getDocs(collection(db, "vacantes"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};
