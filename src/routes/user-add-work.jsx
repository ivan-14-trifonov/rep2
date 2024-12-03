import "./user-add-work.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { AddWork, GetElements, GetBooks } from "../firestore";

function formAddWork(connect, navigate) {

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      name: formData.get("name"),
      book: formData.get("book"),
      number: formData.get("number"),
      page: formData.get("page"),
      theme: formData.get("theme"),
      event: formData.get("event"),
    }
    AddWork(connect, fields);
    e.target.reset();

    navigate("/user");
  }

  const books = GetBooks(connect);
  const events = GetElements(connect, "event");
  const themes = GetElements(connect, "theme");

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <input className="formAddWork__input" name="name" placeholder="Название" />
      <select className="formAddWork__select" name="book" id="books-select">
        <option value="">--Выберите сборник--</option>
          {Array(books.length).fill().map((_, i) =>
            <option value={books[i].name}>{books[i].name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="number" placeholder="Номер" />
      <input className="formAddWork__input" name="page" placeholder="Страница" />
      <select className="formAddWork__select" name="theme" id="themes-select">
        <option value="">--Выберите тему--</option>
          {Array(themes.length).fill().map((_, i) =>
            <option value={themes[i].name}>{themes[i].name}</option>
          )}
      </select>
      <select className="formAddWork__select" name="event" id="events-select">
        <option value="">--Выберите событие--</option>
          {Array(events.length).fill().map((_, i) =>
            <option value={events[i].name}>{events[i].name}</option>
          )}
      </select>

      <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>Сохранить</Button>
    </form>
  );
}

export default function UserAddWork() {

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const connect = {
    db: getFirestore(app),
    space: "x6mEjT4w6nSE1xbyPNFa",
    musical_group: "PjrFQebwtExFEGZvJCt4",
  };

  let form = formAddWork(connect, navigate);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить произведение</h1>
      <div>{form}</div>
    </Container>
  )
}
