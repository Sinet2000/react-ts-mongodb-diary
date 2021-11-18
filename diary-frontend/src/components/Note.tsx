import React, { useState } from "react";
import { Link } from "react-router-dom";
import {authAPI} from "../services/auth";
import {noteAPI} from "../services/note";

import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { INote } from "../models/Note";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

type Props = {
  note: INote;
  notes: Array<INote>;
  setNotes: (notes: Array<INote>) => void;
};

const Note = ({ note, notes, setNotes}: Props) => {
  const date = new Date(note.updatedAt).toDateString();
  const time = new Date(note.updatedAt).toLocaleTimeString();

  const [showModal, setShowModal] = useState(false);

  const user = authAPI.getCurrentUser();
}