import React from "react";
import Notes from "./Notes"

function NoteList({notes, handleAddNote, activeNoteID, setActiveNote}) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <Notes
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    handleAddNote={handleAddNote}
                    activeNoteID={activeNoteID}
                    setActiveNote={setActiveNote}
                ></Notes>
            ))}
        </div>
    )
    ;
}

export default NoteList;