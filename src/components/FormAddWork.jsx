import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { AddWork, GetElements } from "../services/firestore";

export default function FormAddWork({ connect, navigate }) {

  async function submitAddWork(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      name: formData.get("name"),
      book: formData.get("book"),
      number: formData.get("number"),
      page: formData.get("page"),
      theme: formData.get("theme"),
      event: formData.get("event"),
      status: formData.get("status"),
      comment: formData.get("comment"),
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
  }, [connect]);

  const [events, setEvents] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "event", "name");
      setEvents(result);
    };
    asyncEffect();
  }, [connect]);

  const [themes, setThemes] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "theme", "name");
      setThemes(result);
    };
    asyncEffect();
  }, [connect]);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "status", "number");
      
      let arr = []
      for (let i = 0; i < result.length; i++) {
        const statusNumber = parseInt(result[i].number);
        if (!isNaN(statusNumber)) {
          arr[statusNumber] = result[i].name;
        }
      }

      setStatus(arr);
    };
    asyncEffect();
  }, [connect]);

  return (
    (books && events && themes && status) &&
    <form onSubmit={submitAddWork} className="formAddWork">
      <input className="formAddWork__input" name="name" placeholder="Название" />
      <select className="formAddWork__select" name="book" id="books-select">
        <option value="">--Выберите сборник--</option>
          {books && books.length > 0 && Array.from({ length: books.length }, (_, i) =>
            <option key={i} value={books[i].name}>{books[i].name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="number" placeholder="Номер" />
      <input className="formAddWork__input" name="page" placeholder="Страница" />
      <select className="formAddWork__select" name="theme" id="themes-select">
        <option value="">--Выберите тему--</option>
          {themes && themes.length > 0 && Array.from({ length: themes.length }, (_, i) =>
            <option key={i} value={themes[i].name}>{themes[i].name}</option>
          )}
      </select>
      <select className="formAddWork__select" name="event" id="events-select">
        <option value="">--Выберите событие--</option>
          {events && events.length > 0 && Array.from({ length: events.length }, (_, i) =>
            <option key={i} value={events[i].name}>{events[i].name}</option>
          )}
      </select>
      <select className="formAddWork__select" name="status" id="status-select">
        <option value="">--Выберите статус--</option>
          {status && status.length > 1 && Array.from({ length: status.length - 1 }, (_, i) =>
            <option key={i} value={i + 1}>{status[i + 1]}</option>
          )}
      </select>
      <input className="formAddWork__input" name="comment" placeholder="Комментарий" />

      <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>Сохранить</Button>
    </form>
  );
}