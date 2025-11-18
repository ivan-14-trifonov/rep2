import "../styles/user.css";

import { useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, User as FirebaseUser } from "firebase/auth";
import { Container, Card } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements } from "../services/firestore";

interface Space {
  uid: string;
  name: string;
}

interface MusicalGroup {
  id: string;
  name: string;
}

interface Connect {
  db: any;
}

interface SpaceElement {
  uid: string;
}

interface UserElement {
  uid: string;
}

// worksList ЗАМЕНИТЬ!!!!!!
function chooseSpace(spaces: Space[], onSpace: (e: React.MouseEvent) => void): ReactNode {
  return (
    <div>
      <h1 className="worksList">Выберите пространство</h1>
      {spaces.map((space, i) =>
        <Card variant="outlined" onClick={onSpace} className="spaceCard" data-space-uid={space.uid}>
          <p>{space.name}</p>
          {/*}<button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
          <button idWork={works[i].id} onClick={onStatus4}>Статус 4</button>{*/}
      </Card>
      )}
    </div>
  )
}

// worksList spaceCard ЗАМЕНИТЬ! два!!!!!
function chooseMusicalGroup(musGroups: MusicalGroup[], onMusGr: (e: React.MouseEvent) => void): ReactNode {
  return (
    <div>
      <h1 className="worksList">Выберите музыкальный коллектив</h1>
      {musGroups.map((musGroup, i) =>
        <Card variant="outlined" onClick={onMusGr} className="spaceCard" data-mus-gr-id={musGroup.id}>
          <p>{musGroup.name}</p>
      </Card>
      )}
    </div>
  )
}

export default function User() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);

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

  const connect: Connect = useMemo(() => ({
    db: db,
  }), [db]);

  /*
    выбор "пространства"
  */

  // Простанства, сохранённые для этого пользователя
  const [userSpace, setUserSpace] = useState<Space[]>([]);
  useEffect(() => {
    const asyncEffect = async () => {
      if (user) {
        const result = await GetElements(connect, "user/" + user.email + "/space", "uid");
        setUserSpace(result);
      }
    };
    asyncEffect();
  }, [user, connect]); // что будет, если убрать setTimeout(() => setUser... ?

  // выбранное пространство
  const [spaceUid, setSpaceUid] = useState<string | undefined>();

  // Оставляем только те пространства, к которым пользователь имеет доступ
  const [spaces, setSpaces] = useState<Space[]>([]);
  useEffect(() => {
    const asyncEffect = async () => {
      let result: Space[] = [];
      if (user) {
        for (let el of userSpace) {
          const response: UserElement[] = await GetElements(connect, "space/" + el.uid + "/users", "uid");
          if (response.map((r) => r.uid === user.uid).includes(true)) {
            result.push(el);
          }
        }
      }
      if (result.length === 1) setSpaceUid(result[0].uid);
      setSpaces(result);
    };
    asyncEffect();
  }, [userSpace, connect, user?.uid]);

  /*
    выбор музыкальной группы
  */

  // список групп в простанстве
  const [musicalGroups, setMusicalGroups] = useState<MusicalGroup[]>([]);
  useEffect(() => {
    const asyncEffect = async () => {
      if (spaceUid) {
        const result: MusicalGroup[] = await GetElements(connect, "space/" + spaceUid + "/musical_group", "name");
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
  }, [spaceUid, connect, navigate]);

  // события

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  const onMusGr = useCallback((event: React.MouseEvent) => {
    let selectedMusGr = (event.currentTarget as HTMLElement).getAttribute("data-mus-gr-id");
    let url = `/user-works-list?space=${spaceUid}&musicalGroup=${selectedMusGr}`;
    navigate(url);
    // setSpaceUid(selectedSpace);
    // chooseMusicalGroup(musicalGroups, onMusGr)
  }, [spaceUid, navigate]);

  const onSpace = useCallback((event: React.MouseEvent) => {
    let selectedSpace = (event.currentTarget as HTMLElement).getAttribute("data-space-uid");
    setSpaceUid(selectedSpace || undefined);
    // alert(JSON.stringify(musicalGroups));

    // ТОЧКА ОСТАНОВА: как изменять, когда musicalGroups подгрузится???
    // setContent(chooseMusicalGroup(musicalGroups, onMusGr));
  }, []);

  const [content, setContent] = useState<ReactNode>([]);
  useEffect(() => {
    if (spaces) {
    setContent(chooseSpace(spaces, onSpace));
  }
  }, [spaces, onSpace, connect]);
  useEffect(() => {
    if (musicalGroups) {
      setContent(chooseMusicalGroup(musicalGroups, onMusGr));
    }
  }, [musicalGroups, onMusGr]);

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
