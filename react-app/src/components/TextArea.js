import React from "react"
import NoteAdd from '@material-ui/icons/NoteAdd'
import ArrowBack from '@material-ui/icons/ArrowBack'

const NoteAddIcon = () => {
    return (
        <div>
            <NoteAdd className="note-add-icon" form="add-note-form" type="submit"></NoteAdd>
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

function TextArea() {
    return (
        <div id="note-preview" className="note-preview">
            <div className="top-bar">
                <div>
                    <ArrowBackIcon />
                    <NoteAddIcon />
                </div>
            </div>
            <textarea id="note-body" className="note-body" type="text" placeholder="New Note"
                      onChange="saveNote()"></textarea>
        </div>
    );
}

export default TextArea;