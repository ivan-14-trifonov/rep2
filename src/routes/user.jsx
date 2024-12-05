import "./user.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, GetEl, GetWorks } from "../firestore";

function cardsOfWorks(works, navigate) {

  function inBook(work) {
    if (work.number) {
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    };
  }

  function ifBook(work) {
    if (work.book) {
      return <p className="workCard__book">{work.book}, {inBook(work)}</p>;
    }
  }

  function ifEvent(work) {
    if (work.event) {
      return <p className="workCard__event">{work.event}</p>;
    }
  }

  function ifTheme(work) {
    if (work.theme) {
      return <p className="workCard__theme">{work.theme}</p>;
    }
  }

  const onAddPerform = event => {
    let idWork = event.currentTarget.getAttribute("idWork");
    navigate(`/user-add-perform?id=${idWork}`);
  }

  return (
    <div>
      {Array(works.length).fill().map((_, i) =>
        <Card variant="outlined" className="workCard" name={works[i][0]}>
          <p className="workCard__name">{works[i].name}</p>
          {ifBook(works[i])}
          {ifEvent(works[i])}
          {ifTheme(works[i])}
          {works[i].perform && Array(works[i].perform.length).fill().map((_, j) => 
            <p className="perform">{works[i].perform[j].date} {works[i].perform[j].time} {works[i].perform[j].event} {works[i].perform[j].note}</p>
          )}
          {/*works[i].perform &&
            <p className="perform">{works[i].perform.date} {works[i].perform.time} {works[i].perform.event} {works[i].perform.note}</p>
          */}
          <button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
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

  const connect = {
    db: db,
    space: "Go2Aiju3Nuq9wuFqhFha",
    musicalGroup: "IJQZkACyMCfYNoCjiHqS",
  };

  const users = GetElements(connect, "space/" + connect.space + "/users")

  if (user && (users.length != 0)) {
    if (!users.map(i => i.uid).includes(user.uid)) {
      return (
        <Container maxWidth="xs" sx={{mt: 2}}>
          <h1>Недостаточно прав</h1>
          <p>У вас нет доступа к данному пространству.</p>
        </Container>
      )
      
    }
  }

  const space = GetEl(connect, "space", connect.space);
  const musicalGroup = GetEl(connect, "space/" + connect.space + "/musical_group", connect.musicalGroup);

  const connectInfo = {
    space: space.name,
    musicalGroup: musicalGroup.name,
  };

  let works = GetWorks(connect);
  // alert(JSON.stringify(works));

  let cards = cardsOfWorks(works, navigate);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <h1 className="worksList">Cписок произведений</h1>
      {(connectInfo.space && connectInfo.musicalGroup) &&
        <p className="spaceInfo">{connectInfo.space} &bull; {connectInfo.musicalGroup}</p>
      }
      <Button className="addWork" variant="contained" onClick={onAdd} sx={{mt: 3}} fullWidth>Добавить произведение</Button>
      <div>{cards}</div>
    </Container>
  )
}

