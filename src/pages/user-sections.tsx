import "../styles/user-add-work.css";

import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Container, TextField, Button, IconButton, Box } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, AddSection, updateEl, deleteEl, Connect } from "../services/firestore";

interface Section {
  id: string;                   // внутренний идентификатор Firestore
  displayOrder: string;         // поле displayOrder из данных секции (для сортировки)
  name: string;
  sort: string;
  include: Record<string, any[]>;
  exclude: Record<string, any[]>;
}

export default function UserSections() {

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

  const connect: Connect = useMemo(() => ({
    db: db,
    space: spaceParam,
    musicalGroup: musicalGroupParam,
  }), [db, spaceParam, musicalGroupParam]);

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", "displayOrder");
      setSections(result);
    };
    asyncEffect();
  }, [connect]);

  const [displayOrder, setDisplayOrder] = useState("");
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const includeObj = include ? JSON.parse(include) : {};
      const excludeObj = exclude ? JSON.parse(exclude) : {};

      await AddSection(connect, {
        displayOrder,
        name,
        sort,
        include: includeObj,
        exclude: excludeObj
      });
      alert("Секция успешно добавлена");

      setDisplayOrder("");
      setName("");
      setSort("");
      setInclude("");
      setExclude("");

      const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", "displayOrder");
      setSections(result);
    } catch (error) {
      alert("Ошибка при сохранении секции: " + (error instanceof Error ? error.message : error));
    }
  };

  const handleEdit = (section: Section) => {
    setEditingId(section.id);
    setDisplayOrder(section.displayOrder);
    setName(section.name);
    setSort(section.sort);
    setInclude(JSON.stringify(section.include));
    setExclude(JSON.stringify(section.exclude));
  };

  const handleDelete = async (firestoreId: string) => {
    if (window.confirm("Вы действительно хотите удалить эту секцию?")) {
      try {
        await deleteEl(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", firestoreId);
        alert("Секция успешно удалена");
        
        const result = await GetElements(connect, "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", "displayOrder");
        setSections(result);
      } catch (error) {
        alert("Ошибка при удалении секции: " + (error instanceof Error ? error.message : error));
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setDisplayOrder("");
    setName("");
    setSort("");
    setInclude("");
    setExclude("");
  };

  const handleBack = () => {
    navigate(`/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`);
  };

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Настройка секций</h1>
      
      <Box component="form" className="formAddWork" sx={{ mt: 2 }}>
        <TextField
          label="Название секции"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Порядковый номер"
          variant="outlined"
          fullWidth
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          margin="normal"
          placeholder="например: 1, 2, 3"
        />
        <TextField
          label="Поле для сортировки"
          variant="outlined"
          fullWidth
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          margin="normal"
          placeholder="например: number, name"
        />
        <TextField
          label="Include (JSON)"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={include}
          onChange={(e) => setInclude(e.target.value)}
          margin="normal"
          placeholder='{"field": ["value1", "value2"]}'
        />
        <TextField
          label="Exclude (JSON)"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={exclude}
          onChange={(e) => setExclude(e.target.value)}
          margin="normal"
          placeholder='{"field": ["value1", "value2"]}'
        />
        
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {editingId ? "Сохранить" : "Добавить"}
          </Button>
          {editingId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              fullWidth
            >
              Отмена
            </Button>
          )}
        </Box>
      </Box>

      <h2>Существующие секции</h2>
      {sections.map((section, i) => (
        <Box key={section.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <p><strong>{section.name}</strong></p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>Порядок: {section.displayOrder}</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>Сортировка: {section.sort}</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>Include: {JSON.stringify(section.include)}</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>Exclude: {JSON.stringify(section.exclude)}</p>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(section)}
            >
              Редактировать
            </Button>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(section.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button
        variant="outlined"
        fullWidth
        onClick={handleBack}
        sx={{ mt: 2 }}
      >
        ← Назад к списку произведений
      </Button>
    </Container>
  );
}
