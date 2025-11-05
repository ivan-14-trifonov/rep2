import "../styles/user.css";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Card, TextField, Box } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, GetEl, AddStatus, updateEl, deleteEl } from "../services/firestore";

import del from '../assets/images/delete.png';

export default function StatusConfiguration() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await auth.currentUser;

      // если перешли по ссылке без авторизации
      if (result == null) {
        navigate("/login");
      }

      setUser(result);
    };
    asyncEffect();
  }, []);

  const db = getFirestore(app);

  // ДАЛЬШЕ

  const connect = {
    db: db,
    space: searchParams.get('space'),
    musicalGroup: searchParams.get('musicalGroup'),
  };

  const [spaceUsers, setSpaceUsers] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const result = await GetElements(connect, "space/" + connect.space + "/users", "uid");
      setSpaceUsers(result);
    };
    asyncEffect();
  }, []);

  if (user && spaceUsers) {
    if (!spaceUsers.map(i => i.uid).includes(user.uid)) {
      navigate("/user-rights"); 
    }
  }

  const [statuses, setStatuses] = useState([]);
  const [newStatusName, setNewStatusName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connect.space && connect.musicalGroup) {
      loadStatuses();
    }
  }, [connect.space, connect.musicalGroup]);

  const loadStatuses = async () => {
    setLoading(true);
    try {
      const result = await GetElements(connect, `space/${connect.space}/musical_group/${connect.musicalGroup}/status`, "number");
      setStatuses(result.map((status, index) => ({ ...status, id: status.id || index })));
    } catch (error) {
      console.error('Error loading statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const findNextAvailableNumber = (existingStatuses) => {
    // Create an array of existing numbers
    const existingNumbers = existingStatuses
      .map(status => parseInt(status.number))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b);
    
    // Find the first missing number in sequence starting from 1
    let nextNumber = 1;
    for (const num of existingNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else if (num > nextNumber) {
        break; // Found a gap
      }
    }
    return nextNumber;
  };

  const handleAddStatus = async () => {
    if (!newStatusName.trim()) {
      alert('Пожалуйста, введите название статуса');
      return;
    }

    const nextNumber = findNextAvailableNumber(statuses);
    const statusData = {
      number: nextNumber.toString(),
      name: newStatusName.trim()
    };

    try {
      await AddStatus(connect, statusData);
      setNewStatusName('');
      loadStatuses(); // Refresh the list
    } catch (error) {
      console.error('Error adding status:', error);
      alert('Ошибка при добавлении статуса');
    }
  };

  const handleUpdateStatus = async (id, updatedStatus) => {
    try {
      await updateEl(connect, `space/${connect.space}/musical_group/${connect.musicalGroup}/status`, id, updatedStatus);
      loadStatuses(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Ошибка при обновлении статуса');
    }
  };

  const handleDeleteStatus = async (id) => {
    if (window.confirm('Вы действительно хотите удалить этот статус?')) {
      try {
        await deleteEl(connect, `space/${connect.space}/musical_group/${connect.musicalGroup}/status`, id);
        loadStatuses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting status:', error);
        alert('Ошибка при удалении статуса');
      }
    }
  };

  const handleStatusNameChange = (index, newName) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = { ...updatedStatuses[index], name: newName };
    setStatuses(updatedStatuses);
  };

  const handleSaveAllStatuses = async () => {
    for (const status of statuses) {
      try {
        if (status.id) {
          await updateEl(connect, `space/${connect.space}/musical_group/${connect.musicalGroup}/status`, status.id, {
            number: status.number,
            name: status.name
          });
        }
      } catch (error) {
        console.error('Error saving status:', error);
      }
    }
    alert('Все статусы сохранены');
  };

  const handleBack = () => {
    navigate(`/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`);
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      {user &&
        <div className="userBox">
          <p className="userBox_name">{user.displayName}</p>
          <p className="userBox_email">{user.email}</p>
          <p className="userBox_exit" onClick={onLogout}>Выйти</p>
        </div>
      }
      <h1 className="worksList">Настройка статусов</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Добавить новый статус</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <TextField
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            size="small"
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { border: 'none' } }}
            placeholder="Введите название статуса"
          />
          <Button variant="contained" onClick={handleAddStatus} disabled={loading || !newStatusName.trim()}>
            {loading ? 'Добавление...' : 'Добавить'}
          </Button>
        </div>
      </div>

      <div>
        <h3>Существующие статусы</h3>
        {statuses.length > 0 ? (
          <div>
            {statuses.map((status, index) => (
              <div key={status.id || index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '5px 0' }}>
                <TextField
                  value={status.name || ''}
                  onChange={(e) => handleStatusNameChange(index, e.target.value)}
                  size="small"
                  sx={{ flex: 1, '& .MuiOutlinedInput-root': { border: 'none' } }}
                  placeholder="Название статуса"
                />
                <button 
                  type="button"
                  onClick={() => handleDeleteStatus(status.id)}
                  disabled={loading}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    padding: '4px'
                  }}
                >
                  <img 
                    src={del} 
                    alt="Удалить" 
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button 
                variant="contained" 
                onClick={handleSaveAllStatuses} 
                disabled={loading || statuses.length === 0}
              >
                Сохранить все изменения
              </Button>
            </div>
          </div>
        ) : (
          <p>Статусы не найдены. Добавьте новый статус.</p>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={handleBack}>
          Назад
        </Button>
      </div>
    </Container>
  );
}