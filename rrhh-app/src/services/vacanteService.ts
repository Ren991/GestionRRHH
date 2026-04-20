import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";

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
  console.log(snapshot);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateVacante = async (id: string, data: any) => {
  const ref = doc(db, "vacantes", id);
  await updateDoc(ref, data);
};

/*export const deleteVacante = async (id: string) => {
  const ref = doc(db, "vacantes", id);
  await deleteDoc(ref);
};*/

export const deleteVacante = async (id: string) => {
  const ref = doc(db, "vacantes", id);

  await updateDoc(ref, {
    activa: false,
    fechaCierre: new Date()
  });
};

export const toggleVacante = async (id: string, activa: boolean) => {
  const ref = doc(db, "vacantes", id);
  await updateDoc(ref, { activa });
};

export const getVacanteById = async (id: string) => {
  const ref = doc(db, "vacantes", id);
  const snap = await getDoc(ref);

  return { id: snap.id, ...snap.data() };
};