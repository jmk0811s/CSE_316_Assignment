
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import React, {useState, useEffect}  from "react";
import {nanoid} from "nanoid";
import Profile from "./components/Profile"
import useWindowDimensions from "./components/WindowDimension"

function App() {
    const [activeNote, setActiveNote] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const {height, width} = useWindowDimensions();
    const [showSideBar, setShowSideBar] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        location: ""
    });
    const [profileUpdated, setProfileUpdated] = useState(false);

    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: "CSE 101 with a long line of text",
            date: "2021. 08. 18."
        },
        {
            id: nanoid(),
            text: "# CSE 316\nThis is **placeholder text** here",
            date: "2021. 08. 18."
        },
        {
            id: nanoid(),
            text: "Another note",
            date: "2021. 08. 18."
        }
    ]);

    /*
     * Note editing
     */

    const addNote = (text) => {
        const date = new Date();
        let newID = nanoid();
        const newNote = {
            id: newID,
            text: text,
            date: date.toLocaleDateString()
        }

        let newNotes = [];

        for (let i = 0; i < notes.length; i++) {
            let buf = {
                id: notes[i].id,
                text: notes[i].text,
                date: notes[i].date,
            }
            newNotes[i] = buf;
        }

        newNotes.unshift(newNote);
        setNotes(newNotes);
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

    /*
     * Local storage saving
     */

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("note-data"));
        if (savedNotes) {
            console.log("notes are loaded successfully");
            setNotes(savedNotes);
        }
        else {
            console.log("note loading failed");
        }
    }, [])

    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem("profile-data"));
        if (savedProfile) {
            console.log("profile is loaded successfully");
            setProfile(savedProfile);
            setProfileUpdated(~profileUpdated);
        }
        else {
            console.log("profile loading failed");
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("note-data", JSON.stringify(notes));
    }, [notes])

    useEffect(() => {
        localStorage.setItem("profile-data", JSON.stringify(profile));
    }, [profileUpdated])

    /*
     * Return
     */

    if (width <= 500) {
        if (showSideBar) {
            return (
                <div className="App">
                    <SideBar
                        notes={notes}
                        handleAddNote={addNote}
                        handleChangeNote={editNoteText}
                        handleDeleteNote={deleteNote}
                        activeNoteID={activeNote}
                        setActiveNote={setActiveNote}
                        setShowProfile={setShowProfile}
                        setShowSideBar={setShowSideBar}
                    />
                    {showProfile ?
                        <Profile
                            setShowProfile={setShowProfile}
                            profile={profile}
                            setProfile={setProfile}
                            profileUpdated={profileUpdated}
                            setProfileUpdated={setProfileUpdated}
                        /> : null
                    }
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <TextArea
                        handleAddNote={addNote}
                        handleChangeNote={editNoteText}
                        activeNote={getActiveNote()}
                        setShowSideBar={setShowSideBar}
                    />
                    {showProfile ?
                        <Profile
                            setShowProfile={setShowProfile}
                            profile={profile}
                            setProfile={setProfile}
                            profileUpdated={profileUpdated}
                            setProfileUpdated={setProfileUpdated}
                        /> : null
                    }
                </div>
            );
        }
    }
    else {
        return (
            <div className="App">
                <SideBar
                    notes={notes}
                    handleAddNote={addNote}
                    handleChangeNote={editNoteText}
                    handleDeleteNote={deleteNote}
                    activeNoteID={activeNote}
                    setActiveNote={setActiveNote}
                    setShowProfile={setShowProfile}
                    setShowSideBar={setShowSideBar}
                />
                <TextArea
                    handleAddNote={addNote}
                    handleChangeNote={editNoteText}
                    activeNote={getActiveNote()}
                    setShowSideBar={setShowSideBar}
                />
                {showProfile ?
                    <Profile
                        setShowProfile={setShowProfile}
                        profile={profile}
                        setProfile={setProfile}
                        profileUpdated={profileUpdated}
                        setProfileUpdated={setProfileUpdated}
                    /> : null
                }
            </div>
        );
    }
}

export default App;
