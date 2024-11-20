import "./user-add-work.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { AddWork, GetElements } from "../firestore";

function formAddWork(db, navigate) {

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const work = formData.get("work");
    const book = formData.get("book");
    const number = formData.get("number");
    const page = formData.get("page");
    const event = formData.get("event");
    AddWork(work, book, number, page, event, db);
    e.target.reset();

    navigate("/user");
  }

  const books = GetElements(db, "book");
  const events = GetElements(db, "event");

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <input className="formAddWork__input" name="work" placeholder="Название" />
      <select className="formAddWork__select" name="book" id="books-select">
        <option value="">--Выберите сборник--</option>
          {Array(books.length).fill().map((_, i) =>
            <option value={books[i].name}>{books[i].name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="number" placeholder="Номер" />
      <input className="formAddWork__input" name="page" placeholder="Страница" />
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

  const db = getFirestore(app);

  let form = formAddWork(db, navigate);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить произведение</h1>
      <div>{form}</div>
    </Container>
  )
}
