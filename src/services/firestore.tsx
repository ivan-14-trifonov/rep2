import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, orderBy, deleteDoc, Firestore } from "firebase/firestore";

export interface Connect {
  db: Firestore;
  space?: string | null;
  musicalGroup?: string | null;
}

interface Work {
  id: string;
  [key: string]: any;
}

interface Perform {
  id: string;
  work: string;
  [key: string]: any;
}

interface Section {
  sort: string;
  include: Record<string, any[]>;
  exclude: Record<string, any[]>;
}

export async function AddWork(connect: Connect, fields: Record<string, any>) {
  try {
    await addDoc(collection(connect.db, "space", connect.space || "", "musical_group", connect.musicalGroup || "", "work"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export async function AddPerform(connect: Connect, fields: Record<string, any>) {
  try {
    await addDoc(collection(connect.db, "/space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/perform"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export async function AddSection(connect: Connect, fields: Record<string, any>) {
  try {
    await addDoc(collection(connect.db, "space", connect.space || "", "musical_group", connect.musicalGroup || "", "sections"), fields);
  } catch (e) {
    // An error happened.
    // console.error("Error adding document: ", e);
  }
}

export async function GetElements(connect: Connect, table: string, sort: string): Promise<any[]> {
  const elRef = collection(connect.db, table);
  const q = query(elRef, orderBy(sort));
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    let el = doc.data();
    el.id = doc.id;
    result.push(el);
  });

  return result;
}

export async function GetEl(connect: Connect, table: string, id: string): Promise<any | undefined> {
  const docRef = doc(connect.db, table, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export async function updateEl(connect: Connect, table: string, id: string, fields: Record<string, any>) {
  const washingtonRef = doc(connect.db, table, id);

  await updateDoc(washingtonRef, fields);

}

export async function deleteEl(connect: Connect, table: string, id: string) {

  await deleteDoc(doc(connect.db, table, id));
  
}

export function WorksFilter(works: any[], include: Record<string, any[]>, exclude: Record<string, any[]>): any[] {

  function flag(el: any, include: Record<string, any[]>, exclude: Record<string, any[]>): boolean {
    for (let key in include) {
      if (include[key].length > 0) {
        if (include[key].findIndex((i: any) => i === el[key]) === -1) {
          return false;
        }
      }
    }
    for (let key in exclude) {
      if (exclude[key].length > 0) {
        if (exclude[key].findIndex((i: any) => i === el[key]) !== -1) {
          return false;
        }
      }
    }
    return true;
  }

  let res: any[] = [];
  for (let el of works) {
    if (flag(el, include, exclude)) {
      res.push(el);
    }
  }

  return res;
}

export function WorksWithPerforms(works: any[], performs: any[]): any[] {

  let join: Record<string, any> = {};

  for (let el of works) {
    join[el.id] = el;
  }

  for (let el of performs) {
    if (!join[el.work]) {
      join[el.work] = {};
    }
    join[el.work].perform = [];
  }
  for (let el of performs) {
    if (join[el.work]) {
      join[el.work].perform.push(el);
    }
  }

  let res: any[] = [];
  for (let key in join) {
    res.push(join[key]);
  }

  return res;
}

export async function GetWorkInSections(connect: Connect, section: Section) {

  let works = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", section.sort);
  let performs = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/perform", "date");
  let join = WorksWithPerforms(works, performs);
  let workInSection = WorksFilter(join, section.include, section.exclude);

  return workInSection;
}