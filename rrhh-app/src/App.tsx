import { useEffect } from "react";
import {db} from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {

  useEffect(() => {
    const testFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vacantes"));
        console.log("Conectado a Firebase ✅");

        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
        });

      } catch (error) {
        console.error("Error Firebase ❌", error);
      }
    };

    testFirebase();
  }, []);

  return <h1>Firebase Test</h1>;
}

export default App;

