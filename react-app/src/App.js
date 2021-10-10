
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import {useState} from "react";
import {nanoid} from "nanoid";

let currentNote = document.activeElement;

function App() {

    const setActiveElement = () => {
        const temp = document.activeElement;
        if (temp.className == "note") {
            currentNote = temp;
        }
        console.log(currentNote);
    }

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
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()
        }
        setNotes(sortNotes(notes.concat(newNote)));
    }

    const editNoteText = (text) => {
        if (currentNote.className !== "note") return;

        const tempID = currentNote.id
        let newNotes = [];

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == tempID) {
                const date = new Date();
                const newNote = {
                    id: tempID,
                    text: text,
                    date: date.toLocaleDateString()
                }
                newNotes.push(newNote);
            }
            else {
                newNotes.push(notes[i]);
            }
        }

        sortNotes(newNotes);
        setNotes(newNotes);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        currentNote = document.activeElement;
    }

    const sortNotes = (notes) => {

    }

    return (
        <div className="App" onClick={setActiveElement}>
            <SideBar
                notes={notes}
                handleAddNote={addNote}
                handleChangeNote={editNoteText}
                handleDeleteNote={deleteNote}
            />
            <TextArea
                notes={notes}
                handleAddNote={addNote}
                handleChangeNote={editNoteText}
            />
        </div>
    );
}

export default App;
export {currentNote};
