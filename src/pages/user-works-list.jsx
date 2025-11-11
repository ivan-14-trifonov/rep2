import "../styles/user.css";

import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, GetEl, GetWorkInSections, deleteEl } from "../services/firestore";
import WorksList from "../components/WorksList";

export default function UserWorksList() {

  // подключение

  const auth = getAuth();
  let navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await auth.currentUser;

      // если перешли по ссылке без авторизации
      if (result === null) {
        navigate("/login");
      }

      setUser(result);
    };
    asyncEffect();
  }, [auth.currentUser, navigate]);

  const db = getFirestore(app);

  // ДАЛЬШЕ

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const spaceParam = queryParams.get('space');
  const musicalGroupParam = queryParams.get('musicalGroup');
  const sectionParam = queryParams.get('section') || '0'; // default to first section (index 0)

  const connect = useMemo(() => ({
    db: db,
    space: spaceParam,
    musicalGroup: musicalGroupParam,
  }), [db, spaceParam, musicalGroupParam]);

  const [spaceUsers, setSpaceUsers] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/users", "uid");
      setSpaceUsers(result);
    };
    asyncEffect();
  }, [connect]);

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
      
      // If the section parameter is out of bounds, default to first section
      if (result.length > 0 && parseInt(sectionParam) >= result.length) {
        setNumberSection(0);
        // Update URL to default to first section
        navigate(`/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=0`);
      }
    };
    asyncEffect();
  }, [connect, sectionParam, navigate]);

  /*
     реализовать работу с секциями
  */


  const [numberSection, setNumberSection] = useState(parseInt(sectionParam));

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
  }, [connect]);

  const [musicalGroup, setMusicalGroup] = useState([]);
  
  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetEl(connect, "space/" + connect.space + "/musical_group", connect.musicalGroup);
      setMusicalGroup(result);
    };
    asyncEffect();
  }, [connect]);

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
  }, [numberSection, sections, changeFlag, connect]);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "status", "number");
      
      let arr = []
      for (let i = 0; i < result.length; i++) {
        const statusNumber = parseInt(result[i].number);
        if (!isNaN(statusNumber)) {
          arr[statusNumber] = result[i];
        }
      }

      setStatus(arr);
    };
    asyncEffect();
  }, [connect]);

  const onEdit = (workId) => {
    let url = `/user-edit-work/${workId}?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${numberSection}`;
    navigate(url);
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

  // события

  const onAdd = () => {
    let url = `/user-add-work?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${numberSection}`;
    navigate(url);
  }

  const onAddPerform = event => {
    //let idWork = event.currentTarget.getAttribute("idWork");
    //navigate(`/user-add-perform?id=${idWork}`);
    let url = `/user-add-perform?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${numberSection}`;
    navigate(url);
  }

  const onSection = event => {
    let section = parseInt(event.currentTarget.getAttribute("value"));
    setNumberSection(section);
    // Update URL with the selected section
    navigate(`/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}&section=${section}`);
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  const sortByNumber = () => {
    const sortedWorks = [...workInSections].sort((a, b) => {
      const numA = parseInt(a.number) || 0;
      const numB = parseInt(b.number) || 0;
      return numA - numB;
    });
    
    setWorkInSections(sortedWorks);
  };

  // Reset the sorted state when workInSections changes

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
      <Button className="addWork" variant="outlined" onClick={sortByNumber} sx={{mt: 2}} fullWidth>Отсортировать по номерам</Button>
      {sections &&
        <div className="sections">
          {Array(sections.length).fill().map((_, i) =>
            <p className="sections__p">
              <button className={(i === numberSection) ? "sections__button_active sections__button" : "sections__button"} value={i} onClick={onSection}>{sections[i].name}</button>
              {(i !== sections.length - 1) &&
                <b> | </b>
              }
            </p> 
          )}
        </div>
      }
      <div>
        <WorksList 
          works={workInSections} 
          status={status} 
          navigate={navigate} 
          connect={connect} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Container>
  )
}


