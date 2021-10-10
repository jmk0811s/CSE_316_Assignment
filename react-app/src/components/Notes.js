import React, {useState} from "react"

function Notes({id, text, date}) {
    return (
        <div className="note" tabIndex="0" id={id}>
            <span className="noteText">{text}</span>
            <small className="date">{date}</small>
        </div>
    );
}

export default Notes;