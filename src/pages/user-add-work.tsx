import "../styles/user-add-work.css";

import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements } from "../services/firestore";
import FormWork from "../components/FormWork";

export default function UserAddWork() {

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

  const connect = useMemo(() => ({
    db: db,
    space: spaceParam,
    musicalGroup: musicalGroupParam,
  }), [db, spaceParam, musicalGroupParam]);

  const [spaceUsers, setSpaceUsers] = useState<any[] | null>(null);

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

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Добавить произведение</h1>
      <FormWork connect={connect} navigate={navigate} section={sectionParam} />
    </Container>
  )
}
