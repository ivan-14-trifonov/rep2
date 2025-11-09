import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box, Typography, Card, CardContent } from "@mui/material";

export default function UserEditWork() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Получаем данные работы из состояния навигации
  const [work, setWork] = useState(location.state?.work || {});
  
  // Состояния для формы редактирования основной информации
  const [formData, setFormData] = useState({
    name: work.name || "",
    book: work.book || "",
    number: work.number || "",
    page: work.page || "",
    event: work.event || "",
    theme: work.theme || "",
    comment: work.comment || "",
    id: work.id || null
  });

  // Состояния для исполнений
  const [performances, setPerformances] = useState(work.perform || []);
  
  // Состояния для добавления новых исполнений
  const [newPerform, setNewPerform] = useState({
    date: "",
    time: "",
    event: "",
    note: ""
  });

  useEffect(() => {
    // Инициализация данных работы
    if (location.state?.work) {
      setWork(location.state?.work);
      setFormData({
        name: location.state.work.name || "",
        book: location.state.work.book || "",
        number: location.state.work.number || "",
        page: location.state.work.page || "",
        event: location.state.work.event || "",
        theme: location.state.work.theme || "",
        comment: location.state.work.comment || "",
        id: location.state.work.id
      });
      setPerformances(location.state.work.perform || []);
    }
  }, [location.state]);

  const handleSave = () => {
    // Сохраняем обновленную информацию о работе
    const updatedWork = {
      ...work,
      ...formData,
      perform: performances
    };
    
    // Здесь может быть логика отправки данных на сервер
    console.log("Сохраняем обновленную работу:", updatedWork);
    
    // Возвращаемся к списку работ
    navigate("/user-works-list");
  };

  const handleCancel = () => {
    // Возвращаемся к списку работ без сохранения
    navigate("/user-works-list");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPerform = () => {
    if (newPerform.date || newPerform.time || newPerform.event || newPerform.note) {
      const performToAdd = {
        ...newPerform,
        id: performances.length > 0 ? Math.max(...performances.map(p => p.id || 0)) + 1 : 1
      };
      setPerformances([...performances, performToAdd]);
      setNewPerform({ date: "", time: "", event: "", note: "" });
    }
  };

  const removePerform = (index) => {
    const updatedPerformances = [...performances];
    updatedPerformances.splice(index, 1);
    setPerformances(updatedPerformances);
  };

  const updatePerform = (index, field, value) => {
    const updatedPerformances = [...performances];
    updatedPerformances[index] = { ...updatedPerformances[index], [field]: value };
    setPerformances(updatedPerformances);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование работы: {formData.name}
      </Typography>
      
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Название работы"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Книга"
            name="book"
            value={formData.book}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Номер"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Страница"
            name="page"
            value={formData.page}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Событие"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Тема"
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Комментарий"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
          />
        </CardContent>
      </Card>
      
      {/* Редактирование исполнений */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Исполнения
          </Typography>
          
          {performances.map((perform, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 2, padding: 1, border: "1px solid #ccc", borderRadius: 1 }}>
              <Box sx={{ display: "flex", width: "100%", gap: 1, alignItems: "center" }}>
                <TextField
                  label="Дата"
                  type="date"
                  value={perform.date || ""}
                  onChange={(e) => updatePerform(index, "date", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginRight: 1, minWidth: 150 }}
                />
                
                <TextField
                  label="Время"
                  type="time"
                  value={perform.time || ""}
                  onChange={(e) => updatePerform(index, "time", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  sx={{ marginRight: 1, minWidth: 150 }}
                />
                
                <TextField
                  label="Событие"
                  value={perform.event || ""}
                  onChange={(e) => updatePerform(index, "event", e.target.value)}
                  sx={{ marginRight: 1, flex: 1 }}
                />
                
                <TextField
                  label="Заметка"
                  value={perform.note || ""}
                  onChange={(e) => updatePerform(index, "note", e.target.value)}
                  sx={{ marginRight: 1, flex: 1 }}
                />
                
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removePerform(index)}
                  sx={{ minWidth: 40, height: 40 }}
                >
                  Удалить
                </Button>
              </Box>
            </Box>
          ))}
          
          {/* Форма для добавления нового исполнения */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2, padding: 2, border: "1px solid #eee", borderRadius: 1 }}>
            <TextField
              label="Дата"
              type="date"
              value={newPerform.date}
              onChange={(e) => setNewPerform({...newPerform, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              sx={{ marginRight: 1, minWidth: 150 }}
            />
            
            <TextField
              label="Время"
              type="time"
              value={newPerform.time}
              onChange={(e) => setNewPerform({...newPerform, time: e.target.value})}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              sx={{ marginRight: 1, minWidth: 150 }}
            />
            
            <TextField
              label="Событие"
              value={newPerform.event}
              onChange={(e) => setNewPerform({...newPerform, event: e.target.value})}
              sx={{ marginRight: 1, flex: 1 }}
            />
            
            <TextField
              label="Заметка"
              value={newPerform.note}
              onChange={(e) => setNewPerform({...newPerform, note: e.target.value})}
              sx={{ marginRight: 1, flex: 1 }}
            />
            
            <Button
              variant="contained"
              onClick={addPerform}
              sx={{ minWidth: 40, height: 40 }}
            >
              +
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Кнопки сохранения и отмены */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={handleCancel}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
}