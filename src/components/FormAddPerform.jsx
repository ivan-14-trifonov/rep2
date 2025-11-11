import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { GetElements, GetWorkInSections, AddPerform } from "../services/firestore";

export default function FormAddPerform({ connect, navigate }) {

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
  }, [connect]);

  const [events, setEvents] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "event", "name");
      setEvents(result);
    };
    asyncEffect();
  }, [connect]);

  async function submitAddWork(e) {
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

    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section') || '0';
    let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${sectionParam}`;
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