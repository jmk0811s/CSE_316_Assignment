import React, {useState} from "react"
import NoteAdd from '@material-ui/icons/NoteAdd'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Markdown from "./Markdown"
import useWindowDimensions from "./WindowDimension"


const NoteAddIcon = ({handleAddNote}) => {
    const addNote = () => {
        handleAddNote("New Note");
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

function TextArea({handleAddNote, handleChangeNote, activeNote, setShowSideBar}) {
    const {height, width} = useWindowDimensions()

    const handleChange = (e) => {
        handleChangeNote(e.target.value);
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