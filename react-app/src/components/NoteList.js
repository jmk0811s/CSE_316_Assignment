import React from "react";
import Notes from "./Notes"

function NoteList({notes, handleAddNote}) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <Notes
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    handleAddNote={handleAddNote}
                ></Notes>
            ))}
        </div>
    )
    ;
}

export default NoteList;