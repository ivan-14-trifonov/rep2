import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, orderBy } from "firebase/firestore";

export async function AddWork(connect, fields) {
  try {
    const docRef = await addDoc(collection(connect.db, "space", connect.space, "musical_group", connect.musicalGroup, "work"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export async function AddPerform(connect, fields) {
  try {
    const docRef = await addDoc(collection(connect.db, "/space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/perform"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export function GetElements(connect, tadle, sort) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const elRef = collection(connect.db, tadle);
      const q = query(elRef, orderBy(sort));
      const querySnapshot = await getDocs(q);

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

export function GetEl(connect, tadle, id) {
  const [el, setEl] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const docRef = doc(connect.db, tadle, id);
      const docSnap = await getDoc(docRef);
      setEl(docSnap.data());
    };

    asyncEffect();
  }, []);

  return el;
}

export function GetWorkBySections(connect, sections) {
  let res = GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", "name");
  let works = {};
  for (let i = 0; i < res.length; i++) {
    let id = res[i].id;
    works[id] = res[i];
  }

  let performs = GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/perform", "date");

  for (let i = 0; i < performs.length; i++) {
    works[performs[i].work].perform = [];
  }
  for (let i = 0; i < performs.length; i++) {
    works[performs[i].work].perform.push(performs[i]);
  }

  let workBySections = [];

  for (let i = 0; i < sections.length; i++) {
    workBySections[i] = {
      name: sections[i].name,
      works: [],
    }
  }
  for (let key in works) {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].filter(works[key])) {
        workBySections[i].works.push(works[key]);
      }
    }
  };

  return workBySections;
}

export function Status4(connect, idWork) {

  const workRef = doc(connect.db, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", idWork);

  // должно быть await !!!
  updateDoc(workRef, {
    status: "4"
  });
}