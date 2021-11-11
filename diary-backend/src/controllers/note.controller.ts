import { Request, Response } from "express";
import { get } from "lodash";
import { NoteModel } from "../models/note/note.model";
import { UserModel } from "../models/user/user.model";
import { 
  createNote,
  findNote,
  findAndUpdateNote,
  deleteNote 
} from "../services/note.service";
import { 
  CreateNoteInput,
  GetUserNotesInput,
  UpdateNoteInput
} from "../schemas/note.schema";

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteInput["body"]>,
  res: Response
  ) {
    const userId = res.locals.user._id;

    const body = req.body;
  
    const product = await createNote({ ...body, user: userId });
  
    return res.send(product);
}

export async function updateNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
  ) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;
  const newNote = req.body;

  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== userId){
    return res.sendStatus(401);
  }

  const updatedNote = await findAndUpdateNote({ noteId }, newNote, { 
    new: true 
  });

  return res.send(updatedNote);
}

export async function getNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
) {
  const noteId = req.params.noteId;
  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  return res.send(note);
}

export async function getAllUserNotesHandler(
  req: Request<GetUserNotesInput["params"]>,
  res: Response
  ) {
  const userId = req.params.userId;

  await UserModel.findOne({
    userId
  }).exec((err, user) => {
    NoteModel
      .find({ userId})
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

export async function deleteNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;

  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteNote({ noteId });

  return res.sendStatus(200);
}