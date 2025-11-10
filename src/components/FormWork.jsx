import { useState, useEffect } from "react";
import { Button, Box, Card, Typography } from "@mui/material";
import { AddWork, GetElements, GetEl, updateEl, deleteEl } from "../services/firestore";
import editIcon from '../assets/images/edit.png';
import deleteIcon from '../assets/images/delete.png';

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

  // Performance-related state
  const [performances, setPerformances] = useState([]);
  const [editingPerformanceId, setEditingPerformanceId] = useState(null);
  const [editingPerformanceData, setEditingPerformanceData] = useState({});
  const [allEvents, setAllEvents] = useState(null);

  // Fetch data for dropdowns
  const [books, setBooks] = useState(null);
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
      setAllEvents(eventsResult);
      
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

  // Fetch performances when editing a work
  useEffect(() => {
    if (isEditing) {
      const fetchPerformances = async () => {
        // Get all performances for this space and musical group
        const allPerforms = await GetElements(
          connect, 
          `space/${connect.space}/musical_group/${connect.musicalGroup}/perform`, 
          "date"
        );
        
        // Filter to only performances for this specific work
        const workPerformances = allPerforms.filter(perform => perform.work === workId);
        setPerformances(workPerformances);
      };
      fetchPerformances();
    }
  }, [isEditing, workId, connect]);

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



  // Start editing a performance
  const startEditingPerformance = (perform) => {
    setEditingPerformanceId(perform.id);
    setEditingPerformanceData({
      date: perform.date || "",
      time: perform.time || "",
      event: perform.event || "",
      note: perform.note || ""
    });
  };

  // Cancel editing a performance
  const cancelEditingPerformance = () => {
    setEditingPerformanceId(null);
    setEditingPerformanceData({});
  };

  // Handle updating an existing performance
  const handleUpdatePerformance = async (perfId, updatedPerf) => {
    // Update in Firestore
    await updateEl(
      connect,
      `space/${connect.space}/musical_group/${connect.musicalGroup}/perform`,
      perfId,
      updatedPerf
    );
    
    // Refresh the performances list
    const allPerforms = await GetElements(
      connect, 
      `space/${connect.space}/musical_group/${connect.musicalGroup}/perform`, 
      "date"
    );
    
    // Filter to only performances for this specific work
    const workPerformances = allPerforms.filter(perform => perform.work === workId);
    setPerformances(workPerformances);
    
    // Exit edit mode
    setEditingPerformanceId(null);
    setEditingPerformanceData({});
  };

  // Handle deleting a performance
  const handleDeletePerformance = async (perfId) => {
    try {
      // Delete from Firestore
      await deleteEl(
        connect,
        `space/${connect.space}/musical_group/${connect.musicalGroup}/perform`,
        perfId
      );
      
      // Update local state
      setPerformances(performances.filter(perform => perform.id !== perfId));
    } catch (error) {
      console.error("Error deleting performance:", error);
    }
  };



  // Show loading state until all data is loaded
  if (!books || !allEvents || !themes || !allStatuses) {
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
        {allEvents && allEvents.length > 0 && allEvents.map((eventItem, i) =>
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
      
      {/* Performances section */}
      {isEditing && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Исполнения
          </Typography>
          
          {/* Existing performances list */}
          {performances.length > 0 ? (
            performances.map((perform, index) => (
              <Card key={perform.id || index} variant="outlined" sx={{ p: 2, mb: 1 }}>
                {editingPerformanceId === perform.id ? (
                  // Editing mode for this performance
                  <Box>
                    <input 
                      type="date" 
                      value={editingPerformanceData.date} 
                      onChange={(e) => setEditingPerformanceData({...editingPerformanceData, date: e.target.value})}
                      className="formAddWork__input"
                      style={{ width: '100%', marginBottom: '8px' }}
                    />
                    <select 
                      className="formAddWork__select"
                      value={editingPerformanceData.time}
                      onChange={(e) => setEditingPerformanceData({...editingPerformanceData, time: e.target.value})}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      <option value="">--Время--</option>
                      <option value="утро">утро</option>
                      <option value="вечер">вечер</option>
                    </select>
                    <select 
                      className="formAddWork__select"
                      value={editingPerformanceData.event}
                      onChange={(e) => setEditingPerformanceData({...editingPerformanceData, event: e.target.value})}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      <option value="">--Событие--</option>
                      {allEvents && allEvents.length > 0 && allEvents.map((eventItem, i) =>
                        <option key={i} value={eventItem.name}>{eventItem.name}</option>
                      )}
                    </select>
                    <input 
                      className="formAddWork__input"
                      placeholder="Примечание"
                      value={editingPerformanceData.note}
                      onChange={(e) => setEditingPerformanceData({...editingPerformanceData, note: e.target.value})}
                      style={{ width: '100%', marginBottom: '8px' }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => handleUpdatePerformance(perform.id, editingPerformanceData)}
                      >
                        Сохранить
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={cancelEditingPerformance}
                      >
                        Отменить
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  // View mode for this performance
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ flex: 1, marginRight: 1 }}>
                      {perform.date && <Typography variant="body2">Дата: {perform.date}</Typography>}
                      {perform.time && <Typography variant="body2">Время: {perform.time}</Typography>}
                      {perform.event && <Typography variant="body2">Событие: {perform.event}</Typography>}
                      {perform.note && <Typography variant="body2">Примечание: {perform.note}</Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <img
                        onClick={() => startEditingPerformance(perform)}
                        className="workCard__button"
                        src={editIcon}
                        alt="Изменить"
                        style={{ width: '20px', height: '20px', cursor: 'pointer', marginRight: '8px' }}
                      />
                      <img
                        onClick={() => handleDeletePerformance(perform.id)}
                        className="workCard__button"
                        src={deleteIcon}
                        alt="Удалить"
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </Box>
                  </Box>
                )}
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Нет исполнений
            </Typography>
          )}
        </Box>
      )}
      
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