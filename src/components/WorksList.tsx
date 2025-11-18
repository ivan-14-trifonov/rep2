import { Card } from "@mui/material";
import { ReactNode } from 'react';
import edit from '../assets/images/edit.png';
import del from '../assets/images/delete.png';

interface Work {
  id: string;
  name: string;
  book?: string;
  number?: string;
  page?: string;
  event?: string;
  theme?: string;
  comment?: string;
  status?: string;
  perform?: Perform[];
  [key: string]: any;
}

interface Perform {
  date?: string;
  time?: string;
  event?: string;
  note?: string;
}

interface Status {
  name: string;
  color: string;
}

interface WorksListProps {
  works: Work[];
  status: Record<string, Status>;
  navigate: any;
  connect: any;
  onEdit: (id: string) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function WorksList({ works, status, navigate, connect, onEdit, onDelete }: WorksListProps) {

  function inBook(work: Work): string {
    if (work.number) {
      return `№${work.number}`;
    } else if (work.page) {
      return `стр. ${work.page}`;
    } else {
      return "";
    }
  }

  function ifBook(work: Work): ReactNode | null {
    if (work.book) {
      return <p className="workCard__book">{work.book}, {inBook(work)}</p>;
    }
    return null;
  }

  function ifEvent(work: Work): ReactNode | null {
    if (work.event) {
      return <p className="workCard__event">{work.event}</p>;
    }
    return null;
  }

  function ifTheme(work: Work): ReactNode | null {
    if (work.theme) {
      return <p className="workCard__theme">{work.theme}</p>;
    }
    return null;
  }

  function ifComment(work: Work): ReactNode | null {
    if (work.comment) {
      return <p className="workCard__comment">{work.comment}</p>;
    }
    return null;
  }

  function performs(p: Perform): ReactNode {
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
      {works.map((work, i) =>
        <Card variant="outlined" className="workCard" style={works[i].status ? { backgroundColor: status[works[i].status].color } : {}} data-name={works[i][0]}>
          <div className="workCard__panel">
            {works[i].status && <p className="status">{status[works[i].status].name}</p>}
            <p className="workCard__edit">
              <img
                //value={seminars[i].title}
                //id={seminars[i].id}
                //onClick={onDelete}
                data-work-id={works[i].id}
                onClick={onDelete}
                className="workCard__button"
                src={del}
                alt="Удалить"
              />
              <img
                data-work-id={works[i].id}
                onClick={(event: React.MouseEvent) => onEdit((event.currentTarget as HTMLElement).getAttribute("data-work-id") || "")}
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
          {works[i].perform && works[i].perform!.map((perform, j) => 
            performs(perform)
          )}
          {/*}<button idWork={works[i].id} onClick={onAddPerform}>Исполнение</button>
          <button idWork={works[i].id} onClick={onStatus4}>Статус 4</button>{*/}
      </Card>
      )}
    </div>
  );
}