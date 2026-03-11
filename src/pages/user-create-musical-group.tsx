import "../styles/user-add.css";

import { useState, useMemo } from "react";
import { getAuth } from "firebase/auth";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { Connect } from "../services/firestore";

export default function UserCreateMusicalGroup() {
  const auth = getAuth();
  let navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore(app);

  const queryParams = new URLSearchParams(location.search);
  const spaceParam = queryParams.get('space') || '';

  const [musicalGroupName, setMusicalGroupName] = useState("");

  const connect: Connect = useMemo(() => ({
    db: db,
  }), [db]);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user == null) {
      navigate("/login");
      return;
    }

    try {
      // Создаём музыкальную группу внутри пространства
      const musicalGroupRef = collection(db, "space", spaceParam, "musical_group");
      const musicalGroupDoc = await addDoc(musicalGroupRef, {
        name: musicalGroupName,
      });

      // Создаём секцию по умолчанию
      const sectionsRef = collection(db, "space", spaceParam, "musical_group", musicalGroupDoc.id, "sections");
      await addDoc(sectionsRef, {
        name: "(Весь репертуар в одном списке)",
        displayOrder: 4,
        sort: "name",
        include: '{ "book": [], "theme": [], "event": [] }',
        exclude: '{ "book": [], "theme": [], "event": [] }',
      });

      // Добавляем текущего пользователя в users музыкальной группы
      const usersRef = collection(db, "space", spaceParam, "musical_group", musicalGroupDoc.id, "users");
      await addDoc(usersRef, {
        uid: user.uid,
      });

      alert("Музыкальная группа успешно создана.");
      navigate(`/user-works-list?space=${spaceParam}&musicalGroup=${musicalGroupDoc.id}`);
    } catch (error) {
      console.error("Error creating musical group:", error);
      alert("Ошибка при создании: " + (error instanceof Error ? error.message : error));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <h1>Создать музыкальный коллектив</h1>
      <div className="userAddForm">
        <TextField
          label="Название музыкального коллектива"
          variant="outlined"
          fullWidth
          margin="normal"
          value={musicalGroupName}
          onChange={(e) => setMusicalGroupName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          type="button"
          sx={{ mt: 2 }}
        >
          Создать
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Назад
        </Button>
      </div>
    </Container>
  );
}
