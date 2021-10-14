import React from "react"
import ReactMarkDown from 'react-markdown'

function Markdown({activeNote}) {


    return (
        <div className="markdownPreview">
            <ReactMarkDown>{activeNote === undefined ? "" : activeNote.text}</ReactMarkDown>
        </div>
    );
}
export default Markdown;