import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
// const { collection, getDocs } = require("firebase/firestore");

export async function AddWork(connect, fields) {
  try {
    const docRef = await addDoc(collection(connect.db, "space", connect.space, "musical_group", connect.musical_group, "work"), fields);
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
        result.push(doc.data());
      });

      setElements(result);
    };

    asyncEffect();
  }, []);

  return elements;
}

export function GetWorks(connect) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(connect.db, "space", connect.space, "musical_group", connect.musical_group, "work"));
      
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

export function GetUsers(connect) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(connect.db, "user"));

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

export function GetBooks(connect) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(connect.db, "space", connect.space, "musical_group", connect.musical_group, "book"));
      
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      setBooks(result);
    };

    asyncEffect();
  }, []);

  return books;
}