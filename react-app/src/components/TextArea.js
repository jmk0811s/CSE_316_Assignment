import React, {useState} from "react"
import NoteAdd from '@material-ui/icons/NoteAdd'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Markdown from "./Markdown";


const NoteAddIcon = ({handleAddNote}) => {
    const addNote = () => {
        handleAddNote("New Note");
    }

    return (
        <div>
            <NoteAdd className="note-add-icon" onClick={addNote}></NoteAdd>
        </div>
    );
}

const ArrowBackIcon = () => {
    return (
        <div>
            <ArrowBack className="arrow-back-icon"></ArrowBack>
        </div>
    );
}

function TextArea({handleAddNote, handleChangeNote, activeNote}) {
    const [currNote, setCurrNote] = useState('');

    const handleChange = (e) => {
        handleChangeNote(e.target.value);
    }

    return (
        <div id="note-preview" className="note-preview">
            <div className="top-bar">
                <div>
                    <ArrowBackIcon />
                    <NoteAddIcon handleAddNote={handleAddNote}/>
                </div>
            </div>
            <div className="preview-wrapper">
                <textarea
                    id="note-body"
                    className="note-body"
                    type="text"
                    placeholder="Type to add a new note."
                    value={activeNote === undefined ? "" : activeNote.text}
                    onChange={handleChange}
                ></textarea>
                <Markdown activeNote={activeNote}/>
            </div>
        </div>
    );
}

export default TextArea;