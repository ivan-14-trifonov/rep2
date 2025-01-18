import { useState } from "react";
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

export async function GetElements(connect, tadle, sort) {
  const elRef = collection(connect.db, tadle);
  const q = query(elRef, orderBy(sort));
  const querySnapshot = await getDocs(q);

  let result = [];
  querySnapshot.forEach((doc) => {
    let el = doc.data();
    el.id = doc.id;
    result.push(el);
  });

  return result;
}

export async function GetEl(connect, tadle, id) {
  const docRef = doc(connect.db, tadle, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export function WorksFilter(works, include, exclude) {

  function flag(el, include, exclude) {
    for (let key in include) {
      if (include[key].length > 0) {
        if (include[key].findIndex((i) => i === el[key]) == -1) {
          return false;
        }
      }
    }
    for (let key in exclude) {
      if (exclude[key].length > 0) {
        if (exclude[key].findIndex((i) => i === el[key]) != -1) {
          return false;
        }
      }
    }
    return true;
  }

  let res = [];
  for (let el of works) {
    if (flag(el, include, exclude)) {
      res.push(el);
    }
  }

  return res;
}

export function WorksWithPerforms(works, performs) {

  let join = {};

  for (let el of works) {
    join[el.id] = el;
  }

  for (let el of performs) {
    join[el.work].perform = [];
  }
  for (let el of performs) {
    join[el.work].perform.push(el);
  }

  let res = [];
  for (let key in join) {
    res.push(join[key]);
  }

  return res;
}

export async function GetWorkInSections(connect, section) {

  let works = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", section.sort);
  let performs = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/perform", "date");
  let join = WorksWithPerforms(works, performs);
  let workInSection = WorksFilter(join, section.include, section.exclude);

  return workInSection;
}

export function Status4(connect, idWork) {

  const workRef = doc(connect.db, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", idWork);

  // должно быть await !!!
  updateDoc(workRef, {
    status: "4"

  });
}