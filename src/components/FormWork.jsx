import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { AddWork, GetElements, GetEl, updateEl } from "../services/firestore";

export default function FormWork({ connect, navigate, workId = null, initialWorkData = null }) {
  const isEditing = workId !== null;

  // Form state for work fields
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [number, setNumber] = useState("");
  const [page, setPage] = useState("");
  const [theme, setTheme] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  // Fetch data for dropdowns
  const [books, setBooks] = useState(null);
  const [events, setEvents] = useState(null);
  const [themes, setThemes] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);

  // Fetch initial work data if editing
  useEffect(() => {
    if (isEditing && !initialWorkData) {
      const fetchWorkData = async () => {
        const workResult = await GetEl(
          connect, 
          `space/${connect.space}/musical_group/${connect.musicalGroup}/work`, 
          workId
        );
        setName(workResult.name || "");
        setBook(workResult.book || "");
        setNumber(workResult.number || "");
        setPage(workResult.page || "");
        setTheme(workResult.theme || "");
        setEvent(workResult.event || "");
        setStatus(workResult.status || "");
        setComment(workResult.comment || "");
      };
      fetchWorkData();
    } else if (initialWorkData) {
      // Use provided initial data (for edit page when data is already loaded)
      setName(initialWorkData.name || "");
      setBook(initialWorkData.book || "");
      setNumber(initialWorkData.number || "");
      setPage(initialWorkData.page || "");
      setTheme(initialWorkData.theme || "");
      setEvent(initialWorkData.event || "");
      setStatus(initialWorkData.status || "");
      setComment(initialWorkData.comment || "");
    }
  }, [isEditing, workId, initialWorkData, connect]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch books
      const booksResult = await GetElements(
        connect, 
        `space/${connect.space}/musical_group/${connect.musicalGroup}/book`, 
        "name"
      );
      setBooks(booksResult);
      
      // Fetch events
      const eventsResult = await GetElements(connect, "event", "name");
      setEvents(eventsResult);
      
      // Fetch themes
      const themesResult = await GetElements(connect, "theme", "name");
      setThemes(themesResult);
      
      // Fetch statuses
      const statusResult = await GetElements(connect, "status", "number");
      let statusArr = [];
      for (let i = 0; i < statusResult.length; i++) {
        const statusNumber = parseInt(statusResult[i].number);
        if (!isNaN(statusNumber)) {
          statusArr[statusNumber] = statusResult[i];
        }
      }
      setAllStatuses(statusArr);
    };
    fetchData();
  }, [connect]);

  const handleSubmit = async (e) => {
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
    };

    if (isEditing) {
      // Update existing work
      await updateEl(
        connect, 
        `space/${connect.space}/musical_group/${connect.musicalGroup}/work`, 
        workId, 
        fields
      );
    } else {
      // Add new work
      await AddWork(connect, fields);
    }
    
    // Redirect back to works list
    let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    navigate(url);
  };

  // Show loading state until all data is loaded
  if (!books || !events || !themes || !allStatuses) {
    return <div>Загрузка...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="formAddWork">
      <input 
        className="formAddWork__input" 
        name="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Название" 
      />
      <select 
        className="formAddWork__select" 
        name="book" 
        id="books-select" 
        value={book} 
        onChange={(e) => setBook(e.target.value)}
      >
        <option value="">--Выберите сборник--</option>
        {books && books.length > 0 && books.map((bookItem, i) =>
          <option key={i} value={bookItem.name}>{bookItem.name}</option>
        )}
      </select>
      <input 
        className="formAddWork__input" 
        name="number" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
        placeholder="Номер" 
      />
      <input 
        className="formAddWork__input" 
        name="page" 
        value={page} 
        onChange={(e) => setPage(e.target.value)} 
        placeholder="Страница" 
      />
      <select 
        className="formAddWork__select" 
        name="theme" 
        id="themes-select" 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="">--Выберите тему--</option>
        {themes && themes.length > 0 && themes.map((themeItem, i) =>
          <option key={i} value={themeItem.name}>{themeItem.name}</option>
        )}
      </select>
      <select 
        className="formAddWork__select" 
        name="event" 
        id="events-select" 
        value={event} 
        onChange={(e) => setEvent(e.target.value)}
      >
        <option value="">--Выберите событие--</option>
        {events && events.length > 0 && events.map((eventItem, i) =>
          <option key={i} value={eventItem.name}>{eventItem.name}</option>
        )}
      </select>
      <select 
        className="formAddWork__select" 
        name="status" 
        id="status-select" 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
      >
        <option value="">--Выберите статус--</option>
        {allStatuses && allStatuses.map((statusItem, i) => 
          statusItem && i > 0 ? <option key={i} value={i}>{statusItem.name}</option> : null
        ).filter(Boolean)}
      </select>
      <input 
        className="formAddWork__input" 
        name="comment" 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Комментарий" 
      />
      
      <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>
        {isEditing ? "Сохранить" : "Сохранить"}
      </Button>
      <Button 
        variant="outlined" 
        sx={{mt: 2}} 
        fullWidth 
        onClick={() => {
          let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
          navigate(url);
        }}
      >
        Отменить
      </Button>
    </form>
  );
}