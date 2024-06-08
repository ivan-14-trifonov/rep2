import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjaC0gRe7_Rt2hGAKWgWllHtfpYcoDhBQ",
  authDomain: "rep2-459f8.firebaseapp.com",
  projectId: "rep2-459f8",
  storageBucket: "rep2-459f8.appspot.com",
  messagingSenderId: "201429624745",
  appId: "1:201429624745:web:2f8e9cb13ae3f4170ec6b8",
  measurementId: "G-R1N3XEPSHJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Запись данных
async function AddWork(name, number) {
  try {
    const docRef = await addDoc(collection(db, "work"), {
      name: name,
      number: number,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function FormForWork() {
  async function forWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const work = formData.get("work");
    const number = formData.get("number");
    AddWork(work, number);
    alert(`Данные: '${work}', '${number}'`);
  }
  return (
    <form onSubmit={forWork}>
      <input name="work" placeholder="Произведение" />
      <input name="number" placeholder="Номер" />
      <button type="submit">Сохранить</button>
    </form>
  );
}

// Основная функция
function App() {

  // Получение данных
  const [worksArr, setWorksArr] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, "work"));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push([doc.id, doc.data()]);
      });

      setWorksArr(result);
    };

    asyncEffect();
  }, []);

  let works = [];
  if (worksArr.length) {
    works = worksArr[0][0];
  }

  return (
    <div>
        {works}
        {FormForWork()}
    </div>
  );
}

export default App;