import React, {useState} from "react"
import {currentNote} from "./../App.js"
import NoteAdd from '@material-ui/icons/NoteAdd'
import ArrowBack from '@material-ui/icons/ArrowBack'


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

function TextArea({notes, handleAddNote, handleChangeNote}) {
    const [noteText, setNoteText] = useState('');

    const handleChange = (e) => {
        setNoteText(e.target.value);
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
            <textarea
                id="note-body"
                className="note-body"
                type="text"
                placeholder="Text Area"
                value={noteText}
                onChange={handleChange}
            ></textarea>
        </div>
    );
}

export default TextArea;