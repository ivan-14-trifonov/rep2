//import "./user-add-work.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, GetEl, AddPerform } from "../firestore";

function formAddPerform(connect, navigate, id) {

  const work = GetEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", id);
  const events = GetElements(connect, "event");

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      date: formData.get("date"),
      time: formData.get("time"),
      event: formData.get("event"),
      note: formData.get("note"),
    }
    AddPerform(connect, id, fields);
    e.target.reset();

    navigate("/user");
  }

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <p>{work.name}</p>
      <label for="date">Дата исполнения:</label>
      <input type="date" id="date" name="date" />
      <p>Собрание:</p>
      <select className="formAddWork__select" name="time" id="time-select">
        <option value="">--Не определено--</option>
        <option value="утро">утро</option>
        <option value="вечер">вечер</option>
      </select>
      <p>Событие:</p>
      <select className="formAddWork__select" name="event" id="events-select">
        <option value="">--Не определено--</option>
          {Array(events.length).fill().map((_, i) =>
            <option value={events[i].name}>{events[i].name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="note" placeholder="Примечание" />
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
