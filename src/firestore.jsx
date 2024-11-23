import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
// const { collection, getDocs } = require("firebase/firestore");

export async function AddWork(db, fields) {
  try {
    const docRef = await addDoc(collection(db, "work"), fields);
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
      const querySnapshot = await getDocs(collection(db, "user", "6gKLtjBQl7pKpoyQwQfU", "musical_group", "zC3PEO9XUNz7YoswJqE6", "work"));
      alert(JSON.stringify(querySnapshot));
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

export function GetUsers(db) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push([doc.id, doc.data()]);
      });

      setUsers(result);
    };

    asyncEffect();
  }, []);

  return users;
}