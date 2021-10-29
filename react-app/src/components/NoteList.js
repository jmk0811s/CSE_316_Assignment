import React from "react";
import Notes from "./Notes"

function NoteList({notes, handleAddNote, activeNoteID, setActiveNote, setShowSideBar, searchQuery}) {

    return (
        <div className="note-list">
            {
                (notes.filter(note =>
                    note.text.includes(searchQuery))
                ).map(note => (
                <Notes
                    id={note._id}
                    text={note.text}
                    date={note.lastUpdatedDate}
                    handleAddNote={handleAddNote}
                    activeNoteID={activeNoteID}
                    setActiveNote={setActiveNote}
                    setShowSideBar={setShowSideBar}
                ></Notes>
            ))}
        </div>
    )
    ;
}

export default NoteList;