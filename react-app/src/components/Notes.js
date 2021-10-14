import React, {useState} from "react"

function Notes({id, text, date, activeNoteID, setActiveNote, setShowSideBar}) {
    return (
        <div
            className={`note${id === activeNoteID ? "-active" : ""}`}
            tabIndex="0"
            id={id}
            onClick={() => {setActiveNote(id); setShowSideBar(false)}}
        >
            <p className="noteText">{text.split(/\r?\n/)[0]}</p>
            <p className="date">{date}</p>
        </div>
    );
}

export default Notes;