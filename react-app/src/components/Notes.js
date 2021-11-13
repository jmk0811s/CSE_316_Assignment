import React from "react"

function Notes({id, text, date, activeNoteID, setActiveNote, setShowSideBar}) {
    return (
        <div
            className={`note${id === activeNoteID ? "-active" : ""}`}
            tabIndex="0"
            id={id}
            onClick={() => {setActiveNote(id); setShowSideBar(false)}}
        >
            <p className="noteText">{text ? text.split(/\r?\n/)[0] : "New Note"}</p>
            <p className="date">{(new Date(date)).toLocaleString()}</p>
        </div>
    );
}

export default Notes;