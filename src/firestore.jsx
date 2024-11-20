import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function AddWork(name, book, number, page, event, db) {
  try {
    const docRef = await addDoc(collection(db, "work"), {
      name: name,
      book: book,
      number: number,
      page: page,
      event: event,
    });
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export function GetElements(db, tadle) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, tadle));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      setElements(result);
    };

    asyncEffect();
  }, []);

  return elements;
}

export function GetWorks(db) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, "work"));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push([doc.id, doc.data()]);
      });

      setWorks(result);
    };

    asyncEffect();
  }, []);

  return works;
}