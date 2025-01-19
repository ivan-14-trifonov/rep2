import "./user.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements } from "../firestore";

export default function User() {

  // подключение

  // данные о пользователе не будут перерисовываться, если не будет ни одного useEffect
  // надо убрать в useEffect, но как отличить null после попытки и до???
  // вроде можно, но не получается!
  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const asyncEffect = async () => {
  //     const result = await auth.currentUser;
  //     setUser(result);
  //   };
  //   asyncEffect();
  // }, []);

  // если перешли по ссылке без авторизации
  // if (user == null) {
  //   navigate("/login");
  // }

  const db = getFirestore(app);

  const connect = {
    db: db,
  };

  // выбор "пространства"

  // так ошибки нет, но всё равно при перезагрузке не перегружаются данные пользователя!!!

  const [userSpace, setUserSpace] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (user) {
        const result = await GetElements(connect, "user/" + user.email + "/space", "uid");
        setUserSpace(result);
      }
    };
    asyncEffect();
  }, [user]);

  //ТОЛЬКО ЭТОТ КОД ДАЁТ ПЕРЕРИСОВКУ!!!!
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      let result = await GetElements(connect, "space/" + connect.space + "/users", "uid");
      setUsers(result);
    };
    asyncEffect();
  }, []);

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
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <p>{JSON.stringify(userSpace)}</p>
      <h1 className="worksList">Выберите простанство</h1>
    </Container>
  )
}
