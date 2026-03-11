import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { GetElements, GetWorkInSections, AddPerform, Connect } from "../services/firestore";

interface Work {
  id: string;
  name: string;
  [key: string]: any;
}

interface Event {
  name: string;
  [key: string]: any;
}

interface Section {
  name: string;
  sort: string;
  include: Record<string, any[]>;
  exclude: Record<string, any[]>;
}

interface FormAddPerformProps {
  connect: Connect;
  navigate: (path: string) => void;
  section: string;
  workId?: string | null;
  date?: string | null;
}

export default function FormAddPerform({ connect, navigate, section, workId = null, date = null }: FormAddPerformProps) {

  const [works, setWorks] = useState<Work[] | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetWorkInSections(
        connect,
        {
          name: "(Весь репертуар в одном списке)",
          sort: "name",
          include: { book: [], theme: [], event: [] },
          exclude: { book: [], theme: [], event: [] },
        } as Section
      );
      setWorks(result);
    };
    asyncEffect();
  }, [connect]);

  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "event", "name");
      setEvents(result);
    };
    asyncEffect();
  }, [connect]);

  const getWeekday = (dateString: string): string => {
    if (!dateString) return "";
    const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weekday = getWeekday(e.target.value);
    const weekdayInput = document.getElementById("weekday") as HTMLInputElement;
    if (weekdayInput) {
      weekdayInput.value = weekday;
    }
  };

  // Устанавливаем дату при загрузке, если передана
  useEffect(() => {
    if (date) {
      const dateInput = document.getElementById("date") as HTMLInputElement;
      if (dateInput) {
        dateInput.value = date;
        // Trigger weekday update
        const weekday = getWeekday(date);
        const weekdayInput = document.getElementById("weekday") as HTMLInputElement;
        if (weekdayInput) {
          weekdayInput.value = weekday;
        }
      }
    }
  }, [date]);

  async function submitAddWork(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const fields = {
      work: formData.get("work"),
      date: formData.get("date"),
      weekday: formData.get("weekday"),
      time: formData.get("time"),
      event: formData.get("event"),
      note: formData.get("note"),
    }
    AddPerform(connect, fields);
    (e.target as HTMLFormElement).reset();

    let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${section}`;
    navigate(url);
  }

  return (
    (works && events) &&
    <form onSubmit={submitAddWork} className="formAddWork">
      <p>Произведение:</p>
      <select className="formAddWork__select" name="work" id="works-select">
        <option value="">--Не определено--</option>
          {works.map((work, i) =>
            <option key={i} value={work.id} selected={workId === work.id}>{work.name}</option>
          )}
      </select>
      <label htmlFor="date">Дата исполнения:</label>
      <input type="date" id="date" name="date" onChange={handleDateChange} />
      <input type="text" id="weekday" name="weekday" readOnly placeholder="День недели" />
      <p>Собрание:</p>
      <select className="formAddWork__select" name="time" id="time-select">
        <option value="">--Не определено--</option>
        <option value="утро">утро</option>
        <option value="вечер">вечер</option>
      </select>
      <p>Событие:</p>
      <select className="formAddWork__select" name="event" id="events-select">
        <option value="">--Не определено--</option>
          {events.map((event, i) =>
            <option key={i} value={event.name}>{event.name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="note" placeholder="Примечание" />
      <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>Добавить</Button>
    </form>
  );
}