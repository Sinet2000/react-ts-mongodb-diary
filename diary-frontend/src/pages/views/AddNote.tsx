import { useState } from "react";
import { useForm } from "react-hook-form";
import { noteAPI } from '../../api';
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { RouteComponentProps } from "react-router";
import { Routes } from "../../app/routes";
import { NoteInput, createNoteSchema } from "../../api/schemas/noteSchema";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const AddNote = ({ history }: RouteComponentProps) => {
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [addNoteError, setAddNoteError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NoteInput>({
    resolver: zodResolver(createNoteSchema)
  });

  async function onSubmit(values: NoteInput) {
    try{
      values.content = content;

      await noteAPI.addNote(values)
      .then(() => {
        history.push(Routes.Notes)
      });
    } catch(e: any){
      setAddNoteError(e.message);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="title">Add Note</h1>

      <div className="box mt-3">
        <form onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}>
          {addNoteError && (
              <div className="notification is-danger is-light">
                {addNoteError}
              </div>
            )}

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="title"
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
              <button className="button is-link">Add</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddNote;