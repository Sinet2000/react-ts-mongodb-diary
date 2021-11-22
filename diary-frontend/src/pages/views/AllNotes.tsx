import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Note from "../Note";
import { noteAPI } from '../../api';
import { INote } from "../../common/types";
import { Routes } from "../../app/routes";

const AllNotes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    noteAPI
      .getAllUserNotes()
      .then(notes => {
        setNotes(notes);
        if (!notes.length) {
          setMessage(true);
        }
      })
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="title">All Notes</h1>
      <Link to={Routes.CreateNote} className="navbar-item">
        <span className="icon is-small mr-1">
          <i className="fas fa-file-medical"></i>
        </span>
        Add Note
      </Link>

      {notes.length > 0 && (
        <div className="box has-background-info-dark">
          <div className="columns is-multiline">
            { notes.map( (note) => (
                  <div className="column is-one-third" key={note._id}>
                    <Note note={note} notes={notes} setNotes={setNotes} />
                  </div>
                )
              )
            }
          </div>
        </div>
      )}

      {message && (
        <div className="notification is-info is-light">
          <p>Your personal diary doesn't contain any notes yet. To create new note click Add Note button.</p>
        </div>
      )}

    </div>
  );
};

export default AllNotes;