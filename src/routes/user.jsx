import "./user.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { AddWork, GetWorks, GetBooks } from "../firestore";

function formAddWork(db, flag, setFlag) {

  async function submitAddWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const work = formData.get("work");
    const book = formData.get("book");
    const number = formData.get("number");
    const page = formData.get("page");
    AddWork(work, book, number, page, db);
    setFlag(!flag);
    e.target.reset();
  }

  const books = GetBooks(db);

  return (
    <form onSubmit={submitAddWork} className="formAddWork">
      <input className="formAddWork__input" name="work" placeholder="Название" />
      <select className="formAddWork__select" name="book" id="books-select">
        <option value="">--Выберите сборник--</option>
          {Array(books.length).fill().map((_, i) =>
            <option value={books[i].name}>{books[i].name}</option>
          )}
      </select>
      <input className="formAddWork__input" name="number" placeholder="Номер" />
      <input className="formAddWork__input" name="page" placeholder="Страница" />

      <button className="formAddWork__button" type="submit">Сохранить</button>
    </form>
  );
}

function tadleOfWorks(works) {

  function inBook(work) {
    if (work.number) {
      
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    };
  }

  return (
    <div className="workCard">
      {Array(works.length).fill().map((_, i) =>
        <div name={works[i][0]}>
          <p className="workCard__name">{works[i][1].name}</p>
          <p className="workCard__book">{works[i][1].book}, {inBook(works[i][1])}</p>
      </div>
      )}
    </div>
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

  const [flag, setFlag] = useState(false);

  let works = GetWorks(db, flag);
  // alert(JSON.stringify(works));
  let tadle = tadleOfWorks(works);
  let form = formAddWork(db, flag, setFlag);

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

