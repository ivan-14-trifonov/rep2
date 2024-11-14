import "./user.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetWorks } from "../firestore";

function cardsOfWorks(works) {

  function inBook(work) {
    if (work.number) {
      
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    };
  }

  return (
    <div>
      {Array(works.length).fill().map((_, i) =>
        <Card variant="outlined" className="workCard" name={works[i][0]}>
          <p className="workCard__name">{works[i][1].name}</p>
          <p className="workCard__book">{works[i][1].book}, {inBook(works[i][1])}</p>
      </Card>
      )}
    </div>
  )
}

export default function User() {

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const onAdd = () => {
    navigate("/user-add-work");
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  const db = getFirestore(app);

  let works = GetWorks(db);
  // alert(JSON.stringify(works));
  let cards = cardsOfWorks(works);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Репертуар</h1>
      <div>{cards}</div>
      <Button variant="contained" onClick={onAdd} sx={{mt: 3}} fullWidth>Добавить произведение</Button>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Выйти
      </Button>
    </Container>
  )
}

