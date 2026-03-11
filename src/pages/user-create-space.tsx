import "../styles/user-add.css";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";

export default function UserCreateSpace() {
  const auth = getAuth();
  let navigate = useNavigate();
  const db = getFirestore(app);

  const [spaceName, setSpaceName] = useState("");
  const [musicalGroupName, setMusicalGroupName] = useState("");

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user == null) {
      navigate("/login");
      return;
    }

    try {
      // Создаём пространство
      const spaceRef = collection(db, "space");
      const spaceDoc = await addDoc(spaceRef, {
        name: spaceName,
      });

      // Создаём музыкальную группу внутри пространства
      const musicalGroupRef = collection(db, "space", spaceDoc.id, "musical_group");
      const musicalGroupDoc = await addDoc(musicalGroupRef, {
        name: musicalGroupName,
      });

      // Создаём секцию по умолчанию
      const sectionsRef = collection(db, "space", spaceDoc.id, "musical_group", musicalGroupDoc.id, "sections");
      await addDoc(sectionsRef, {
        name: "(Весь репертуар в одном списке)",
        displayOrder: 4,
        sort: "name",
        include: '{ "book": [], "theme": [], "event": [] }',
        exclude: '{ "book": [], "theme": [], "event": [] }',
      });

      // Добавляем текущего пользователя в users пространства
      const usersRef = collection(db, "space", spaceDoc.id, "users");
      await addDoc(usersRef, {
        uid: user.uid,
      });

      // Добавляем пространство в коллекцию пользователя
      if (user.email) {
        const userSpaceRef = collection(db, "user", user.email, "space");
        await addDoc(userSpaceRef, {
          name: spaceName,
          uid: spaceDoc.id,
        });
      }

      alert("Пространство и музыкальная группа успешно созданы.");
      navigate(`/user-works-list?space=${spaceDoc.id}&musicalGroup=${musicalGroupDoc.id}`);
    } catch (error) {
      console.error("Error creating space:", error);
      alert("Ошибка при создании: " + (error instanceof Error ? error.message : error));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <h1>Создать новое пространство</h1>
      <div className="userAddForm">
        <TextField
          label="Название пространства"
          variant="outlined"
          fullWidth
          margin="normal"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <TextField
          label="Название музыкальной группы"
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
