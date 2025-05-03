import "./user.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card, TextField, Modal, Box } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, GetEl, GetWorkInSections, Status4, AddWork, updateEl, deleteEl } from "../firestore";

import edit from './images/edit.png';
import del from './images/delete.png';

// Модальное окно редактирования произведения
const EditWorkModal = ({ connect, work_id, isOpen, onClose }) => {

  async function submitEditWork(e: React.FormEvent) {
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
  }, []);

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
  }, []);

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
};

// Модальное окно добавления произведения
// НЕ ДОПИСАНО
const AddWorkModal = ({ connect, isOpen, onClose, onSave }) => {
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
      status: formData.get("status"),
    }
    AddWork(connect, fields);
    e.target.reset();

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

  //const [title, setTitle] = useState(seminar.title);
  //const [description, setDescription] = useState(seminar.description);

  const handleSave = () => {
    /*const updatedSeminar = {
      ...seminar,
      title,
      description,
      date,
      time,
      photo,
    };
    onSave(updatedSeminar);
    onClose();*/
  };

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
        {(books && events && themes) &&
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
          <input className="formAddWork__input" name="status" placeholder="Статус" />

          <Button variant="contained" type="submit" sx={{mt: 3}} fullWidth>Сохранить</Button>
        </form>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Отменить
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

function cardsOfWorks(works, status, navigate, connect, openModal, onDelete) {

  function inBook(work) {
    if (work.number) {
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    };
  }

  function ifBook(work) {
    if (work.book) {
      return <p className="workCard__book">{work.book}, {inBook(work)}</p>;
    }
  }

  function ifEvent(work) {
    if (work.event) {
      return <p className="workCard__event">{work.event}</p>;
    }
  }

  function ifTheme(work) {
    if (work.theme) {
      return <p className="workCard__theme">{work.theme}</p>;
    }
  }

  function ifComment(work) {
    if (work.comment) {
      return <p className="workCard__comment">{work.comment}</p>;
    }
  }

  function performs(p) {

    let date = "";
    if (p.date) {
      date = " " + p.date;
    }

    let time = "";
    if (p.time) {
      time = " " + p.time;
    }

    let event = "";
    if (p.event) {
      event = ", " + p.event;
    }

    let note = "";
    if (p.note) {
      note = " [" + p.note + "]";
    }

    return <p className="perform">&#10149;<b>{date}{time}{event}{note}</b></p>;
  }

  const onStatus4 = event => {
    let idWork = event.currentTarget.getAttribute("idWork");
    Status4(connect, idWork);
  }

  return (
    <div>
      {Array(works.length).fill().map((_, i) =>
        <Card variant="outlined" className={`workCard ${works[i].status && 'status' + works[i].status}`} name={works[i][0]}>
          <div className="workCard__panel">
            {works[i].status && <p className="status">{status[works[i].status]}</p>}
            <p className="workCard__edit">
              <img
                //value={seminars[i].title}
                //id={seminars[i].id}
                //onClick={onDelete}
                work_id={works[i].id}
                onClick={onDelete}
                className="workCard__button"
                src={del}
                alt="Удалить"
              />
              <img
                work_id={works[i].id}
                onClick={openModal}
                className="workCard__button"
                src={edit}
                alt="Изменить"
              />
            </p>
          </div>
          <p className="workCard__name">{works[i].name}</p>
          {ifBook(works[i])}
          {ifEvent(works[i])}
          {ifTheme(works[i])}
          {ifComment(works[i])}
          {works[i].perform && Array(works[i].perform.length).fill().map((_, j) => 
            performs(works[i].perform[j])
          )}
          {/*}<button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
          <button idWork={works[i].id} onClick={onStatus4}>Статус 4</button>{*/}
      </Card>
      )}
    </div>
  )
}

export default function UserWorksList() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await auth.currentUser;

      // если перешли по ссылке без авторизации
      if (result == null) {
        navigate("/login");
      }

      setUser(result);
    };
    asyncEffect();
  }, []);

  const db = getFirestore(app);

  // ДАЛЬШЕ

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

  /*if (spaceUsers.length == 0) {
    navigate("/user-rights");
  }*/

  if (user && spaceUsers) {
    if (!spaceUsers.map(i => i.uid).includes(user.uid)) {
      navigate("/user-rights"); 
    }
  }

  const [sections, setSections] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", "id");
      for (let i = 0; i < result.length; i++) {
        result[i].include = JSON.parse(result[i].include);
        result[i].exclude = JSON.parse(result[i].exclude);
      }
      setSections(result);
    };
    asyncEffect();
  }, []);

  /*
     реализовать работу с секциями
  */


  const [numberSection, setNumberSection] = useState(0);

  // СДЕЛАТЬ:
  // реализовать для пользователя возможность получить права на пространство
  // или создать своё

  const [space, setSpace] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetEl(connect, "space", connect.space);
      setSpace(result);
    };
    asyncEffect();
  }, []);

  const [musicalGroup, setMusicalGroup] = useState([]);
  
  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetEl(connect, "space/" + connect.space + "/musical_group", connect.musicalGroup);
      setMusicalGroup(result);
    };
    asyncEffect();
  }, []);

  const connectInfo = {
    space: space.name,
    musicalGroup: musicalGroup.name,
  };

  const [changeFlag, setChangeFlag] = useState(false);

  const [workInSections, setWorkInSections] = useState([]);
  
  useEffect(() => {
    const asyncEffect = async () => {
      if (sections) {
        const result = await GetWorkInSections(connect, sections[numberSection]);
        setWorkInSections(result);
      }
    };
    asyncEffect();
  }, [numberSection, sections, changeFlag]);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/status", "number");
      
      let arr = []
      for (let i = 0; i < result.length; i++) {
        arr[i + 1] = result[i].name;
      }

      setStatus(arr);
    };
    asyncEffect();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idWorkEdit, setIdWorkEdit] = useState(false);
  
  const openModal = (event) => {
    setIdWorkEdit(event.currentTarget.getAttribute("work_id"));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIdWorkEdit(false);
    setChangeFlag(!changeFlag);

    // по сути, это заглушка, без которой пока не работает...
    setTimeout(() => setChangeFlag(!changeFlag), 10000);
  };

  const onDelete = (event) => {
    let idWorkDelete = event.currentTarget.getAttribute("work_id");
    if (window.confirm("Вы действительно хотите удалить запись о данном произведении?")) {
      deleteEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", idWorkDelete);
      alert("Запись удалена.");

      setChangeFlag(!changeFlag);

      // по сути, это заглушка, без которой пока не работает...
      setTimeout(() => setChangeFlag(!changeFlag), 10000);
    }
  };

  // Пример // НЕ РЕАЛИЗОВАНО
  const handleSave_ = (updatedSeminar) => {
    const res = true; // updateSeminar(updatedSeminar.id, updatedSeminar);
    if (res) {
      alert('Запись успешно обновлена');
      // setFlag(!flag);
    }
    else {
      alert('Ошибка при обновлении записи');
    };
  };

  let cards = cardsOfWorks(workInSections, status, navigate, connect, openModal, onDelete);

  // события

  const onAdd = () => {
    let url = `/user-add-work?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    navigate(url);
  }

  const onAddPerform = event => {
    //let idWork = event.currentTarget.getAttribute("idWork");
    //navigate(`/user-add-perform?id=${idWork}`);
    let url = `/user-add-perform?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
    navigate(url);
  }

  const onSection = event => {
    let section = event.currentTarget.getAttribute("value");
    setNumberSection(section);
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <h1 className="worksList">Cписок произведений</h1>
      {(connectInfo.space && connectInfo.musicalGroup) &&
        <p className="spaceInfo">{connectInfo.space} &bull; {connectInfo.musicalGroup}</p>
      }
      <Button className="addWork" variant="contained" onClick={onAdd} sx={{mt: 3}} fullWidth>Добавить произведение</Button>
      <Button className="addWork" variant="contained" onClick={onAddPerform} sx={{mt: 3}} fullWidth>Добавить исполнение</Button>
      {sections &&
        <div className="sections">
          {Array(sections.length).fill().map((_, i) =>
            <p className="sections__p">
              <button className="sections__button" className={(i == numberSection) ? "sections__button_active" : "sections__button"} value={i} onClick={onSection}>{sections[i].name}</button>
              {(i != sections.length - 1) &&
                <b> | </b>
              }
            </p> 
          )}
        </div>
      }
      <div>
        {cards}
      </div>
      {idWorkEdit && <EditWorkModal
        connect={connect}
        work_id={idWorkEdit}
        isOpen={isModalOpen}
        onClose={closeModal}
      />}
    </Container>
  )
}


