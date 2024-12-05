import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

export async function AddWork(connect, fields) {
  try {
    const docRef = await addDoc(collection(connect.db, "space", connect.space, "musical_group", connect.musicalGroup, "work"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export async function AddPerform(connect, id, fields) {
  alert(JSON.stringify(fields));
  try {
    // const docRef = await addDoc(collection(connect.db, "space", connect.space, "musical_group", connect.musicalGroup, "work"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export function GetElements(connect, tadle) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(connect.db, tadle));

      let result = [];
      querySnapshot.forEach((doc) => {
        let el = doc.data();
        el.id = doc.id;
        result.push(el);
      });

      setElements(result);
    };

    asyncEffect();
  }, []);

  return elements;
}

export function GetEl(connect, tadle, idEl) {
  const [el, setEl] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const docRef = doc(connect.db, tadle, idEl);
      const docSnap = await getDoc(docRef);
      setEl(docSnap.data());
    };

    asyncEffect();
  }, []);

  return el;
}