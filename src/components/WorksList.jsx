import { Card } from "@mui/material";
import edit from '../assets/images/edit.png';
import del from '../assets/images/delete.png';

export default function WorksList({ works, status, navigate, connect, openModal, onDelete }) {

  function inBook(work) {
    if (work.number) {
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    };
  }

  function ifBook(work) {
    if (work.book) {
      return <p className="workCard__book">{work.book}, {inBook(work)}</p>;
    }
  }

  function ifEvent(work) {
    if (work.event) {
      return <p className="workCard__event">{work.event}</p>;
    }
  }

  function ifTheme(work) {
    if (work.theme) {
      return <p className="workCard__theme">{work.theme}</p>;
    }
  }

  function ifComment(work) {
    if (work.comment) {
      return <p className="workCard__comment">{work.comment}</p>;
    }
  }

  function performs(p) {

    let date = "";
    if (p.date) {
      date = " " + p.date;
    }

    let time = "";
    if (p.time) {
      time = " " + p.time;
    }

    let event = "";
    if (p.event) {
      event = ", " + p.event;
    }

    let note = "";
    if (p.note) {
      note = " [" + p.note + "]";
    }

    return <p className="perform">&#10149;<b>{date}{time}{event}{note}</b></p>;
  }

  return (
    <div>
      {Array(works.length).fill().map((_, i) =>
        <Card variant="outlined" className={`workCard ${works[i].status && 'status' + works[i].status}`} name={works[i][0]}>
          <div className="workCard__panel">
            {works[i].status && <p className="status">{status[works[i].status]}</p>}
            <p className="workCard__edit">
              <img
                //value={seminars[i].title}
                //id={seminars[i].id}
                //onClick={onDelete}
                work_id={works[i].id}
                onClick={onDelete}
                className="workCard__button"
                src={del}
                alt="Удалить"
              />
              <img
                work_id={works[i].id}
                onClick={openModal}
                className="workCard__button"
                src={edit}
                alt="Изменить"
              />
            </p>
          </div>
          <p className="workCard__name">{works[i].name}</p>
          {ifBook(works[i])}
          {ifEvent(works[i])}
          {ifTheme(works[i])}
          {ifComment(works[i])}
          {works[i].perform && Array(works[i].perform.length).fill().map((_, j) => 
            performs(works[i].perform[j])
          )}
          {/*}<button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
          <button idWork={works[i].id} onClick={onStatus4}>Статус 4</button>{*/}
      </Card>
      )}
    </div>
  );
}