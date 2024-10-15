import "./user.css";

import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {Button, Container} from "@mui/material";

import {getFirestore} from "firebase/firestore";
import {app} from "../firebase";
import {AddWork, GetWorks} from "../firestore"; // GetBooks

function formAddWork(db) {

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const work = formData.get("work");
    const number = formData.get("number");
    AddWork(work, number, db);
    e.target.reset();
  }

  // const books = GetBooks(db);

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <input name="work" placeholder="Название" />
      {/*}<select name="books" id="books-select">
        <option value="">--Выберите сборник--</option>
          {Array(books.length).fill().map((_, i) =>
            <option value={books[i].name}>{books[i].name}</option>
          )}
      </select>
      <input name="page" placeholder="Страница" />{*/}
      <input name="number" placeholder="Номер" />

      <button type="submit">Сохранить</button>
    </form>
  );
}

function tadleOfWorks(works) {
  // alert(JSON.stringify(works));

  return (
    <table className="tadleOfWorks">
      {Array(works.length).fill().map((_, i) =>
        <tr>
          <td className="tadleOfWorks__td">{works[i][0]}</td>
          <td className="tadleOfWorks__td">{works[i][1].name}</td>
          <td className="tadleOfWorks__td">{works[i][1].number}</td>
        </tr>
      )}
    </table>
  )
}

export default function User() {

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  const db = getFirestore(app);

  let works = GetWorks(db);
  let tadle = tadleOfWorks(works);
  let form = formAddWork(db);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Репертуар</h1>
      <div>{tadle}</div>
      <h2>Добавить произведение</h2>
      <div>{form}</div>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Выйти
      </Button>
    </Container>
  )
}

