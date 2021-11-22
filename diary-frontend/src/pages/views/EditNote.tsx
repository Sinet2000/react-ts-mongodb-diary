import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { noteAPI } from '../../api';
import { Routes } from "../../app/routes";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { RouteComponentProps } from "react-router";
import { NoteInput, createNoteSchema } from "../../api/schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

type TProps= {
  id: string;
};

const EditNote = ({ match, history }: RouteComponentProps<TProps>) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("preview");
  const [editNoteError, setEditNoteError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NoteInput>({
    resolver: zodResolver(createNoteSchema)
  });

  const id = match.params.id;

  useEffect(() => {
    noteAPI.getNoteById(id)
      .then(note => {
        setTitle(note.title);
        setContent(note.content);
      });
  },[id]);

  async function onSubmit(values: NoteInput) {
    try{
      values.content = content;

      await noteAPI.editNote(values, id)
      .then(() => {
        history.push(Routes.Notes)
      });
    } catch(e: any){
      setEditNoteError(e.message);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="title">Edit Note</h1>

      <div className="box mt-3">
        <form onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}>
          {editNoteError && (
              <div className="notification is-danger is-light">
                {editNoteError}
              </div>
            )}

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                {...register("title")}
              />
            </div>
            <p>{errors.title?.message}</p>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <ReactMde
              value={content}
              onChange={setContent}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Save</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditNote;