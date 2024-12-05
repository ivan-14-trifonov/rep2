//import "./user-add-work.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { AddWork, GetElements, GetEl } from "../firestore";

function formAddPerform(connect, navigate, id) {

  let work = GetEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", id);

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      name: formData.get("name"),
    }
    // AddPerform(connect, id, fields);
    e.target.reset();

    navigate("/user");
  }

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <p>{work.name}</p>
      <input className="formAddWork__input" name="name" placeholder="Название" />
      <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>Добавить</Button>
    </form>
  );
}

export default function UserAddPerform() {

  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);
  const id = params.get('id');

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const connect = {
    db: getFirestore(app),
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

  let form = formAddPerform(connect, navigate, id);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить исполнение</h1>
      <div>{form}</div>
    </Container>
  )
}
