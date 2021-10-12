import React from "react"
import ReactMarkDown from 'react-markdown'

function Markdown({activeNote}) {

    const markdown = "**bold**";

    return (
        <div className="markdownPreview">
            <ReactMarkDown>{markdown}</ReactMarkDown>
        </div>
    );
}
export default Markdown;