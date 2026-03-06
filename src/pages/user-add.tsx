import "../styles/user-add.css";

import { useState, useMemo } from "react";
import { getAuth } from "firebase/auth";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { SetUser, Connect } from "../services/firestore";

export default function UserAdd() {
  const auth = getAuth();
  let navigate = useNavigate();
  const db = getFirestore(app);

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [spaces, setSpaces] = useState<{ name: string; id: string }[]>([{ name: "", id: "" }]);

  const connect: Connect = useMemo(() => ({
    db: db,
  }), [db]);

  const handleSubmit = () => {
    SetUser(connect, { userId, userName, email, spaces });
  };

  const handleAddSpace = () => {
    setSpaces([...spaces, { name: "", id: "" }]);
  };

  const handleSpaceChange = (index: number, field: "name" | "id", value: string) => {
    const newSpaces = [...spaces];
    newSpaces[index][field] = value;
    setSpaces(newSpaces);
  };

  const handleRemoveSpace = (index: number) => {
    if (spaces.length > 1) {
      const newSpaces = spaces.filter((_, i) => i !== index);
      setSpaces(newSpaces);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <h1>Добавить пользователя</h1>
      <div className="userAddForm">
        <TextField
          label="user_id"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="user_name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>Пространства</h2>
        {spaces.map((space, index) => (
          <div key={index} className="spaceFields">
            <TextField
              label="space_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={space.name}
              onChange={(e) => handleSpaceChange(index, "name", e.target.value)}
            />
            <TextField
              label="space_id"
              variant="outlined"
              fullWidth
              margin="normal"
              value={space.id}
              onChange={(e) => handleSpaceChange(index, "id", e.target.value)}
            />
            {spaces.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveSpace(index)}
                sx={{ mt: 1 }}
              >
                −
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddSpace}
          sx={{ mt: 1 }}
        >
          +
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          добавить
        </Button>
      </div>
    </Container>
  );
}
