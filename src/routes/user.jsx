import "./user.css";

import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, SyncGetElements } from "../firestore";

function spaces() {

}

export default function User() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const [user, setUser] = useState(auth.currentUser);

  // по сути, это заглушка, без которой пока не работает...
  setTimeout(() => setUser(auth.currentUser), 400);
  setTimeout(() => setUser(auth.currentUser), 1000);

  // этот код всё равно не работает
  // ПОЧИНИТЬ!!!
  // проблема в том, что auth.currentUser возвращает сначала null!!!
  /*if (user == null) {
    navigate("/login");
  }*/

  const db = getFirestore(app);

  const connect = {
    db: db,
  };

  // выбор "пространства"

  const [userSpace, setUserSpace] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (user) {
        const result = await GetElements(connect, "user/" + user.email + "/space", "uid");
        setUserSpace(result);
      }
    };
    asyncEffect();
  }, [user]); // что будет, если убрать setTimeout(() => setUser... ?

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      let result = [];
      for (let el of userSpace) {
        let response = await GetElements(connect, "space/" + el.uid + "/users", "uid");
        if (response.map((r) => r.uid == user.uid).includes(true)) {
          result.push(el);
        }
      }
      setSpaces(result);
    };
    asyncEffect();
  }, [userSpace]);

  console.log(JSON.stringify(spaces));

  // события

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      {!user &&
        <div className="userBox">
          <p className="userBox_name">загрузка...</p>
          <p className="userBox_email">загрузка...</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <p>{JSON.stringify(userSpace)}</p>
      <h1 className="worksList">Выберите пространство</h1>
    </Container>
  )
}
