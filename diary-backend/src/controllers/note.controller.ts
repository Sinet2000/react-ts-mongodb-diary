import { Request, Response } from "express";
import NoteModel from "../models/note.model";
import UserModel from "../models/user.model";
import { CreateNoteInput, UpdateNoteInput } from "../routes/shema-managers/note.schema";
import { NoteService } from "../services";

async function createNoteHandler(
  req: Request<{}, {}, CreateNoteInput["body"]>,
  res: Response
  ) {
    const userId = res.locals.user._id;

    const body = req.body;
  
    const note = await NoteService.createNote({ ...body, user: userId });
  
    return res.send(note);
}

async function updateNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
  ) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;
  const newNote = req.body;

  const note = await NoteService.findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== userId){
    return res.sendStatus(401);
  }

  const updatedNote = await NoteService.findAndUpdateNote({ noteId }, newNote, { 
    new: true 
  });

  return res.send(updatedNote);
}

async function getNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
) {
  const noteId = req.params.noteId;
  const note = await NoteService.findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  return res.send(note);
}

async function getAllUserNotesHandler(
  req: Request,
  res: Response
  ) {
    const userId = res.locals.user._id;

    await UserModel.findOne({
      userId
    }).exec((err, user) => {
      NoteModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while fetching notes."
          });
        });
    })
}

async function deleteNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;

  const note = await NoteService.findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await NoteService.deleteNote({ noteId });

  return res.sendStatus(200);
}

export const NoteController = {
  createNoteHandler,
  updateNoteHandler,
  getNoteHandler,
  getAllUserNotesHandler,
  deleteNoteHandler
};