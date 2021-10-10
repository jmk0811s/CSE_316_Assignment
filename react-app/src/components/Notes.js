import React, {useState} from "react"


function Notes() {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
            text: text,
            id: Date.now()
        };

        setNotes(notes.concat(newNote));
        setText('');
    }

    return (
        <div>
            <div>
                <RenderNotes notes={notes}/>
                <form id="add-note-form" onSubmit={handleSubmit}>
                </form>
            </div>
        </div>
    );
}

function RenderNotes(props) {
    return (
        <ul>
            {props.notes.map(note => (
                <li key={note.id}>{note.text}</li>
            ))}
        </ul>
    );
}

export default Notes;