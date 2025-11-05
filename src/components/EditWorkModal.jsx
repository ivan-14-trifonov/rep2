import { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import { GetElements, GetEl, updateEl } from "../services/firestore";

export default function EditWorkModal({ connect, work_id, isOpen, onClose }) {

  async function submitEditWork(e) {
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
    updateEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", work_id, fields);
    e.target.reset();

    onClose();

    //let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    //navigate(url);
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

  const [allStatuses, setAllStatuses] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/status", "number");
      
      let arr = []
      for (let i = 0; i < result.length; i++) {
        arr[i + 1] = result[i].name;
      }

      setAllStatuses(arr);
    };
    asyncEffect();
  }, [connect]);

  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [number, setNumber] = useState("");
  const [page, setPage] = useState("");
  const [theme, setTheme] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [work, setWork] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", work_id);
      setWork(result);
    };
    asyncEffect();
  }, [connect, work_id]);

  useEffect(() => {
    if (work) {
      setName(work.name);
      setBook(work.book);
      setNumber(work.number);
      setPage(work.page);
      setTheme(work.theme);
      setEvent(work.event);
      setStatus(work.status);
      setComment(work.comment);
    }
  }, [work]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Редактирование</h2>
        {(books && events && themes && allStatuses) &&
        <form onSubmit={submitEditWork} className="formAddWork">
          <input className="formAddWork__input" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <select className="formAddWork__select" name="book" id="books-select" value={book} onChange={(e) => setBook(e.target.value)}>
            <option value="">--Выберите сборник--</option>
              {Array(books.length).fill().map((_, i) =>
                <option value={books[i].name}>{books[i].name}</option>
              )}
          </select>
          <input className="formAddWork__input" name="number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <input className="formAddWork__input" name="page" value={page} onChange={(e) => setPage(e.target.value)} />
          <select className="formAddWork__select" name="theme" id="themes-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="">--Выберите тему--</option>
              {Array(themes.length).fill().map((_, i) =>
                <option value={themes[i].name}>{themes[i].name}</option>
              )}
          </select>
          <select className="formAddWork__select" name="event" id="events-select" value={event} onChange={(e) => setEvent(e.target.value)}>
            <option value="">--Выберите событие--</option>
              {Array(events.length).fill().map((_, i) =>
                <option value={events[i].name}>{events[i].name}</option>
              )}
          </select>
          <select className="formAddWork__select" name="status" id="status-select" value={status} onChange={(e) => setStatus(e.target.value)} >
            <option value="">--Выберите статус--</option>
              {Array(allStatuses.length - 1).fill().map((_, i) =>
                <option value={i + 1}>{allStatuses[i + 1]}</option>
              )}
          </select>
          <input className="formAddWork__input" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              Отменить
            </Button>
            <Button variant="contained" type="submit">
              Сохранить
            </Button>
          </Box>
        </form>}
      </Box>
    </Modal>
  );
}