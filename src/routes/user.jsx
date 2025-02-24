import "./user.css";

import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { GetElements, SyncGetElements } from "../firestore";

// worksList ЗАМЕНИТЬ!!!!!!
function chooseSpace(spaces, onSpace) {
  return (
    <div>
      <h1 className="worksList">Выберите пространство</h1>
      {Array(spaces.length).fill().map((_, i) =>
        <Card variant="outlined" onClick={onSpace} className="spaceCard" spaceUid={spaces[i].uid}>
          <p>{spaces[i].name}</p>
          {/*}<button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
          <button idWork={works[i].id} onClick={onStatus4}>Статус 4</button>{*/}
      </Card>
      )}
    </div>
  )
}

// worksList spaceCard ЗАМЕНИТЬ! два!!!!!
function chooseMusicalGroup(musGroups, onMusGr) {
  return (
    <div>
      <h1 className="worksList">Выберите музыкальный коллектив</h1>
      {Array(musGroups.length).fill().map((_, i) =>
        <Card variant="outlined" onClick={onMusGr} className="spaceCard" musGrId={musGroups[i].id}>
          <p>{musGroups[i].name}</p>
      </Card>
      )}
    </div>
  )
}

export default function User() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const [user, setUser] = useState(auth.currentUser);

  // по сути, это заглушка, без которой пока не работает...
  setTimeout(() => setUser(auth.currentUser), 400);
  setTimeout(() => setUser(auth.currentUser), 1000);
  setTimeout(() => setUser(auth.currentUser), 2000);
  setTimeout(() => setUser(auth.currentUser), 5000);

  // этот код всё равно не работает
  // ПОЧИНИТЬ!!!
  // проблема в том, что auth.currentUser возвращает сначала null!!!
  /*if (user == null) {
    navigate("/login");
  }*/

  const db = getFirestore(app);

  const connect = {
    db: db,
  };

  /*
    выбор "пространства"
  */

  // Простанства, сохранённые для этого пользователя
  const [userSpace, setUserSpace] = useState([]);
  useEffect(() => {
    const asyncEffect = async () => {
      if (user) {
        const result = await GetElements(connect, "user/" + user.email + "/space", "uid");
        setUserSpace(result);
      }
    };
    asyncEffect();
  }, [user]); // что будет, если убрать setTimeout(() => setUser... ?

  // выбранное пространство
  const [spaceUid, setSpaceUid] = useState();

  // Оставляем только те пространства, к которым пользователь имеет доступ
  const [spaces, setSpaces] = useState([]);
  useEffect(() => {
    const asyncEffect = async () => {
      let result = [];
      for (let el of userSpace) {
        let response = await GetElements(connect, "space/" + el.uid + "/users", "uid");
        if (response.map((r) => r.uid == user.uid).includes(true)) {
          result.push(el);
        }
      }
      if (result.length === 1) setSpaceUid(result[0].uid);
      setSpaces(result);
    };
    asyncEffect();
  }, [userSpace]);

  /*
    выбор музыкальной группы
  */

  // список групп в простанстве
  const [musicalGroups, setMusicalGroups] = useState([]);
  useEffect(() => {
    const asyncEffect = async () => {
      if (spaceUid) {
        const result = await GetElements(connect, "space/" + spaceUid + "/musical_group", "name");
        if (result.length === 1) 
          {
            let mg = result[0].id;
            let url = `/user-works-list?space=${spaceUid}&musicalGroup=${mg}`;
            navigate(url);
          }
        setMusicalGroups(result);
      }
    };
    asyncEffect();
  }, [spaceUid]);

  // события

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  const onMusGr = event => {
    let selectedMusGr = event.currentTarget.getAttribute("musGrId");;
    let url = `/user-works-list?space=${spaceUid}&musicalGroup=${selectedMusGr}`;
    navigate(url);
    // setSpaceUid(selectedSpace);
    // chooseMusicalGroup(musicalGroups, onMusGr)
  }

  const onSpace = event => {
    let selectedSpace = event.currentTarget.getAttribute("spaceUid");;
    setSpaceUid(selectedSpace);
    // alert(JSON.stringify(musicalGroups));

    // ТОЧКА ОСТАНОВА: как изменять, когда musicalGroups подгрузится???
    // setContent(chooseMusicalGroup(musicalGroups, onMusGr));
  }

  const [content, setContent] = useState([]);
  useEffect(() => {
    if (spaces) {
    setContent(chooseSpace(spaces, onSpace));
  }
  }, [spaces]);
  useEffect(() => {
    if (musicalGroups) {
      setContent(chooseMusicalGroup(musicalGroups, onMusGr));
    }
  }, [musicalGroups]);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      {!user &&
        <div className="userBox">
          <p className="userBox_name">загрузка...</p>
          <p className="userBox_email">загрузка...</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <div>{content}</div>
    </Container>
  )
}
