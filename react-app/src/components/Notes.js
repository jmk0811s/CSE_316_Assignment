import React, {useState} from "react"

function Notes({id, text, date, activeNoteID, setActiveNote}) {
    return (
        <div
            className={`note${id === activeNoteID ? "-active" : ""}`}
            tabIndex="0"
            id={id}
            onClick={() => setActiveNote(id)}
        >
            <span className="noteText">{text}</span>
            <small className="date">{date}</small>
        </div>
    );
}

export default Notes;