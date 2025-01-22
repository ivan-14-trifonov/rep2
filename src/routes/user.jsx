import "./user.css";

import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements } from "../firestore";

/*import "./user.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, GetEl, GetWorkInSections, Status4 } from "../firestore";*/

export default function User() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;

  // этот код всё равно не работает
  // ПОЧИНИТЬ!!!
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
  }, [user]);

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
      <h1 className="worksList">Выберите пространство</h1>
    </Container>
  )
}
