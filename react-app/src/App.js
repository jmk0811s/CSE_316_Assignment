
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
            console.log(currentNote);
        }
    }

    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: "Example note 1",
            date: "date test 1"
        },
        {
            id: nanoid(),
            text: "Example note 2",
            date: "date test 2"
        }
    ]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()
        }

        setNotes(notes.concat(newNote));
    }

    const editNoteText = (text) => {
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        currentNote = null;
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
