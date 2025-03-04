import "./user.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, GetEl, GetWorkInSections, Status4 } from "../firestore";

function cardsOfWorks(works, navigate, connect) {

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
        <Card variant="outlined" className="workCard" name={works[i][0]} hidden={(works[i].status == 4)}>
          <p className="workCard__name">{works[i].name}</p>
          {ifBook(works[i])}
          {ifEvent(works[i])}
          {ifTheme(works[i])}
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






  // СДЕЛАТЬ таблицу для хранения секций
  // и вообще реализовать работу с секциями

  const sections = [
    {
      name: "Молитвенные",
      sort: "name",
      include: { book: [], theme: ["Молитвенные"], event: [] },
      exclude: { book: [], theme: [], event: [] },
    },
    {
      name: "Разные темы",
      sort: "name",
      include: { book: [], theme: [], event: [] },
      exclude: { book: [], theme: ["Молитвенные", ""], event: [] },
    },
    {
      name: "Праздничные",
      sort: "event",
      include: { book: [], theme: [], event: [] },
      exclude: { book: [], theme: [], event: [""] },
    },
    {
      name: "(Весь репертуар в одном списке)",
      sort: "name",
      include: { book: [], theme: [], event: [] },
      exclude: { book: [], theme: [], event: [] },
    },

  ];

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

  const [workInSections, setWorkInSections] = useState([]);
  
  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetWorkInSections(connect, sections[numberSection]);
      setWorkInSections(result);
    };
    asyncEffect();
  }, [numberSection]);

  //alert(JSON.stringify(workBySections[0]));

  let cards = cardsOfWorks(workInSections, navigate, connect);

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
      <div>
        {cards}
      </div>
    </Container>
  )
}


