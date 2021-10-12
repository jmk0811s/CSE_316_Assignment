
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import React, {useState} from "react";
import {nanoid} from "nanoid";

function App() {

    const [currNote, setCurrNote] = useState(document.activeElement);
    const [activeNote, setActiveNote] = useState(false);

    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: "CSE 101 with a long line of text asdasd",
            date: "2021. 08. 18."
        },
        {
            id: nanoid(),
            text: "CSE 316",
            date: "2021. 08. 18."
        },
        {
            id: nanoid(),
            text: "Another note",
            date: "2021. 08. 18."
        }
    ]);

    const addNote = (text) => {
        const date = new Date();
        let newID = nanoid();
        const newNote = {
            id: newID,
            text: text,
            date: date.toLocaleDateString()
        }

        notes.unshift(newNote);
        setNotes(notes);
        setActiveNote(newID);
    }

    const editNoteText = (newText) => {
        let newNotes = [];
        const date = new Date();
        let newNote = {
            id: activeNote,
            text: newText,
            date: date.toLocaleDateString()
        }

        newNotes = notes.filter(note => note.id !== activeNote);
        newNotes.unshift(newNote);

        setNotes(newNotes);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
        setActiveNote(newNotes[0].id);
    }

    const getActiveNote = () => {
        return notes.find(note => note.id === activeNote);
    }

    return (
        <div className="App">
            <SideBar
                notes={notes}
                handleAddNote={addNote}
                handleChangeNote={editNoteText}
                handleDeleteNote={deleteNote}
                activeNoteID={activeNote}
                setActiveNote={setActiveNote}
            />
            <TextArea
                handleAddNote={addNote}
                handleChangeNote={editNoteText}
                activeNote={getActiveNote()}
            />
        </div>
    );
}

export default App;
