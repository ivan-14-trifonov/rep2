import "./user-add-work.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { AddWork, GetElements } from "../firestore";

function FormAddWork(connect, navigate) {

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

    let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    navigate(url);
  }

  const [books, setBooks] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/book", "name");
      setBooks(result);
    };
    asyncEffect();
  }, []);

  const [events, setEvents] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "event", "name");
      setEvents(result);
    };
    asyncEffect();
  }, []);

  const [themes, setThemes] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "theme", "name");
      setThemes(result);
    };
    asyncEffect();
  }, []);

  return (
    (books && events && themes) &&
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

  const db = getFirestore(app);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const connect = {
    db: db,
    space: queryParams.get('space'),
    musicalGroup: queryParams.get('musicalGroup'),
  };

  const [spaceUsers, setSpaceUsers] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/users", "uid");
      setSpaceUsers(result);
    };
    asyncEffect();
  }, []);

  if (user && spaceUsers) {
    if (!spaceUsers.map(i => i.uid).includes(user.uid)) {
      navigate("/user-rights"); 
    }
  }

  let form = FormAddWork(connect, navigate);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить произведение</h1>
      <div>{form}</div>
    </Container>
  )
}
