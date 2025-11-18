import "../styles/user-add-work.css";

import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Container, Button } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { GetElements, GetEl, updateEl, AddWork, AddSection } from "../services/firestore";

export default function UserEditSections() {

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
  
  const connect = useMemo(() => ({
    db: db,
    space: spaceParam,
    musicalGroup: musicalGroupParam,
  }), [db, spaceParam, musicalGroupParam]);

  const [spaceUsers, setSpaceUsers] = useState(null);
  const [sections, setSections] = useState([]);

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

  // Load sections for editing
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionsResult = await GetElements(
          connect, 
          "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", 
          "id"
        );
        
        // Parse include/exclude fields as JSON
        const sectionsWithParsedFields = sectionsResult.map(section => {
          let includeObj = {};
          let excludeObj = {};
          
          try {
            includeObj = JSON.parse(section.include || '{}');
          } catch (e) {
            console.error("Error parsing include JSON:", e);
          }
          
          try {
            excludeObj = JSON.parse(section.exclude || '{}');
          } catch (e) {
            console.error("Error parsing exclude JSON:", e);
          }
          
          return {
            ...section,
            id: section.id,
            include: includeObj,
            exclude: excludeObj,
          };
        });
        
        setSections(sectionsWithParsedFields);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [connect]);

  // Handle saving section changes
  const handleSaveSection = async (sectionId, updatedFields) => {
    try {
      // Prepare data - ensure include/exclude are stored as JSON strings
      const sectionData = {
        ...updatedFields,
        include: JSON.stringify(updatedFields.include || {}),
        exclude: JSON.stringify(updatedFields.exclude || {}),
      };
      
      await updateEl(
        connect,
        `space/${connect.space}/musical_group/${connect.musicalGroup}/sections`,
        sectionId,
        sectionData
      );
      
      // Update local state
      setSections(prevSections => 
        prevSections.map(section => 
          section.id === sectionId 
            ? { ...section, ...sectionData, include: updatedFields.include, exclude: updatedFields.exclude } 
            : section
        )
      );
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  // Handle adding a new section
  const handleAddSection = async () => {
    try {
      const newSection = {
        name: "Новая секция",
        sort: "name",
        include: JSON.stringify({}),
        exclude: JSON.stringify({}),
      };
      
      await AddSection(connect, newSection);
      
      // Refresh sections
      const sectionsResult = await GetElements(
        connect, 
        "space/" + connect.space + "/musical_group/" + connect.musicalGroup + "/sections", 
        "id"
      );
      
      // Parse include/exclude fields as JSON
      const sectionsWithParsedFields = sectionsResult.map(section => ({
        ...section,
        id: section.id,
        include: JSON.parse(section.include || '{}'),
        exclude: JSON.parse(section.exclude || '{}'),
      }));
      
      setSections(sectionsWithParsedFields);
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  // Handle deleting a section
  const handleDeleteSection = async (sectionId) => {
    if (window.confirm("Вы действительно хотите удалить эту секцию?")) {
      try {
        await updateEl(
          connect,
          `space/${connect.space}/musical_group/${connect.musicalGroup}/sections`,
          sectionId,
          { deleted: true } // Soft delete by marking as deleted
        );
        
        // Update local state
        setSections(prevSections => 
          prevSections.filter(section => section.id !== sectionId)
        );
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  // Handle input change for section fields
  const handleInputChange = (sectionId, field, value) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, [field]: value } 
          : section
      )
    );
  };

  // Handle include/exclude field changes
  const handleFilterChange = (sectionId, filterType, field, value) => {
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.id === sectionId) {
          const updatedFilters = {
            ...section[filterType],
            [field]: value
          };
          return {
            ...section,
            [filterType]: updatedFilters
          };
        }
        return section;
      })
    );
  };

  return (
    <Container maxWidth="md" sx={{mt: 2}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h1>Настроить секции</h1>
        <Button variant="contained" onClick={handleAddSection}>
          Добавить секцию
        </Button>
      </div>
      
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {sections.map((section, index) => (
          <div key={section.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Секция {index + 1}: {section.name}</h3>
              <Button 
                variant="outlined" 
                color="error"
                size="small"
                onClick={() => handleDeleteSection(section.id)}
              >
                Удалить
              </Button>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label>Название секции:</label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => handleInputChange(section.id, 'name', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label>Поле сортировки:</label>
              <input
                type="text"
                value={section.sort}
                onChange={(e) => handleInputChange(section.id, 'sort', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <h4>Включать (Include)</h4>
                <p>Формат: ключ=значение (например: theme=Рождество)</p>
                
                {Object.keys(section.include).map((key, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        const value = section.include[key];
                        handleFilterChange(section.id, 'include', newKey, value);
                        // Remove old key
                        if (newKey !== key) {
                          const newInclude = { ...section.include };
                          delete newInclude[key];
                          newInclude[newKey] = value;
                          setSections(prevSections => 
                            prevSections.map(s => 
                              s.id === section.id ? { ...s, include: newInclude } : s
                            )
                          );
                        }
                      }}
                      style={{ flex: 1, padding: '5px' }}
                      placeholder="Ключ"
                    />
                    <input
                      type="text"
                      value={section.include[key] || ''}
                      onChange={(e) => handleFilterChange(section.id, 'include', key, e.target.value)}
                      style={{ flex: 1, padding: '5px' }}
                      placeholder="Значение"
                    />
                  </div>
                ))}
                
                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                  <input
                    type="text"
                    id={`new-include-key-${section.id}`}
                    placeholder="Добавить ключ"
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <input
                    type="text"
                    id={`new-include-value-${section.id}`}
                    placeholder="Добавить значение"
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => {
                      const newKey = document.getElementById(`new-include-key-${section.id}`).value;
                      const newValue = document.getElementById(`new-include-value-${section.id}`).value;
                      if (newKey && newValue) {
                        handleFilterChange(section.id, 'include', newKey, newValue);
                        document.getElementById(`new-include-key-${section.id}`).value = '';
                        document.getElementById(`new-include-value-${section.id}`).value = '';
                      }
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div style={{ flex: 1 }}>
                <h4>Исключать (Exclude)</h4>
                <p>Формат: ключ=значение (например: status=1)</p>
                
                {Object.keys(section.exclude).map((key, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        const value = section.exclude[key];
                        handleFilterChange(section.id, 'exclude', newKey, value);
                        // Remove old key
                        if (newKey !== key) {
                          const newExclude = { ...section.exclude };
                          delete newExclude[key];
                          newExclude[newKey] = value;
                          setSections(prevSections => 
                            prevSections.map(s => 
                              s.id === section.id ? { ...s, exclude: newExclude } : s
                            )
                          );
                        }
                      }}
                      style={{ flex: 1, padding: '5px' }}
                      placeholder="Ключ"
                    />
                    <input
                      type="text"
                      value={section.exclude[key] || ''}
                      onChange={(e) => handleFilterChange(section.id, 'exclude', key, e.target.value)}
                      style={{ flex: 1, padding: '5px' }}
                      placeholder="Значение"
                    />
                  </div>
                ))}
                
                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                  <input
                    type="text"
                    id={`new-exclude-key-${section.id}`}
                    placeholder="Добавить ключ"
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <input
                    type="text"
                    id={`new-exclude-value-${section.id}`}
                    placeholder="Добавить значение"
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => {
                      const newKey = document.getElementById(`new-exclude-key-${section.id}`).value;
                      const newValue = document.getElementById(`new-exclude-value-${section.id}`).value;
                      if (newKey && newValue) {
                        handleFilterChange(section.id, 'exclude', newKey, newValue);
                        document.getElementById(`new-exclude-key-${section.id}`).value = '';
                        document.getElementById(`new-exclude-value-${section.id}`).value = '';
                      }
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            
            <Button 
              variant="contained" 
              onClick={() => handleSaveSection(section.id, {
                name: section.name,
                sort: section.sort,
                include: section.include,
                exclude: section.exclude
              })}
            >
              Сохранить изменения
            </Button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Button 
          variant="outlined" 
          onClick={() => {
            let url = `/user-works-list?space=${connect.space}&musicalGroup=${connect.musicalGroup}`;
            navigate(url);
          }}
        >
          Назад к списку
        </Button>
      </div>
    </Container>
  );
}