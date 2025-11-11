import "../styles/user-add-work.css";

import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, GetEl } from "../services/firestore";
import FormWork from "../components/FormWork";

export default function UserEditWork() {

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const db = getFirestore(app);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const spaceParam = queryParams.get('space');
  const musicalGroupParam = queryParams.get('musicalGroup');
  const sectionParam = queryParams.get('section') || '0';
  
  // Get work ID from URL parameter
  const { workId } = useParams();

  const connect = useMemo(() => ({
    db: db,
    space: spaceParam,
    musicalGroup: musicalGroupParam,
  }), [db, spaceParam, musicalGroupParam]);

  const [spaceUsers, setSpaceUsers] = useState(null);
  const [initialWorkData, setInitialWorkData] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/users", "uid");
      setSpaceUsers(result);
    };
    asyncEffect();
  }, [connect]);

  if (user && spaceUsers) {
    if (!spaceUsers.map(i => i.uid).includes(user.uid)) {
      navigate("/user-rights"); 
    }
  }

  // Load initial work data for editing
  useEffect(() => {
    const fetchWorkData = async () => {
      if (workId) {
        const workResult = await GetEl(
          connect, 
          "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/work", 
          workId
        );
        setInitialWorkData(workResult);
      }
    };
    fetchWorkData();
  }, [connect, workId]);

  if (!initialWorkData) {
    return <Container maxWidth="xs" sx={{mt: 2}}>Загрузка...</Container>;
  }

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Редактировать произведение</h1>
      <FormWork 
        connect={connect} 
        navigate={navigate} 
        workId={workId}
        initialWorkData={initialWorkData}
      />
    </Container>
  );
}