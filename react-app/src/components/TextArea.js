import React, {useState} from "react"
import NoteAdd from '@material-ui/icons/NoteAdd'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Markdown from "./Markdown"


const NoteAddIcon = ({handleAddNote}) => {
    const addNote = () => {
        handleAddNote("");
    }

    return (
        <NoteAdd className="note-add-icon" onClick={addNote}></NoteAdd>
    );
}

const ArrowBackIcon = ({setShowSideBar}) => {
    return (
        <ArrowBack className="arrow-back-icon" onClick={() => setShowSideBar(true)}></ArrowBack>
    );
}

function TextArea({notes, handleAddNote, handleChangeNote, activeNote, setShowSideBar, saveNoteToServer, addNote}) {

    const handleChange = (e) => {
        if (activeNote === undefined) return;
        handleChangeNote(e.target.value, false, notes, activeNote._id);
        saveNoteToServer(e.target.value, notes, activeNote._id);
    }

    return (
        <div id="note-preview" className="note-preview">
            <div className="top-bar">
                <ArrowBackIcon setShowSideBar={setShowSideBar}/>
                <NoteAddIcon handleAddNote={handleAddNote}/>
            </div>
            <div className="preview-wrapper">
                <textarea
                    id="note-body"
                    className="note-body"
                    type="text"
                    placeholder="Text Area"
                    value={activeNote === undefined ? "" : activeNote.text}
                    onChange={handleChange}
                ></textarea>
                <Markdown activeNote={activeNote}/>
            </div>
        </div>
    );
}

export default TextArea;