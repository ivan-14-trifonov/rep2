//import "./user-add-work.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, GetWorkInSections, AddPerform } from "../services/firestore";

function FormAddPerform(connect, navigate, id) {

  const [works, setWorks] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetWorkInSections(
        connect,
        {
          name: "(Весь репертуар в одном списке)",
          sort: "name",
          include: { book: [], theme: [], event: [] },
          exclude: { book: [], theme: [], event: [] },
        }
      );
      setWorks(result);
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

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      work: formData.get("work"),
      date: formData.get("date"),
      time: formData.get("time"),
      event: formData.get("event"),
      note: formData.get("note"),
    }
    AddPerform(connect, fields);
    e.target.reset();

    let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    navigate(url);
  }

  return (
    (works && events) &&
    <form onSubmit={submitAddWork} className="formAddWork">
      <p>Произведение:</p>
      <select className="formAddWork__select" name="work" id="works-select">
        <option value="">--Не определено--</option>
          {Array(works.length).fill().map((_, i) =>
            <option value={works[i].id}>{works[i].name}</option>
          )}
      </select>
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

  let form = FormAddPerform(connect, navigate, id);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить исполнение</h1>
      <div>{form}</div>
    </Container>
  )
}
