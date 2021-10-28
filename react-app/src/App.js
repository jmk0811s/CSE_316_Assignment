
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import React, {useState, useEffect}  from "react"
import Profile from "./components/Profile"
import useWindowDimensions from "./components/WindowDimension"
import {
    getUsersAPIMethod,
    createNoteAPIMethod,
    getNotesAPIMethod,
    getNoteByIdAPIMethod,
    updateNoteAPIMethod,
    deleteNoteByIdAPIMethod
} from "./api/client"

function App() {
    const [activeNote, setActiveNote] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const {height, width} = useWindowDimensions();
    const [showSideBar, setShowSideBar] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [serverCall, setServerCall] = useState(false);

    const [profile, setProfile] = useState([]);

    const [notes, setNotes] = useState([]);

    //get notes from the database
    useEffect(() => {
        getNotesAPIMethod().then((notes) => {
            console.log("Server Call\n");
            setNotes(notes);
            //console.dir(notes);
        });
    }, [serverCall]);

    //get users from the database
    useEffect(() => {
        getUsersAPIMethod().then((users) => {
            setProfile(users[0]);
            console.dir(users);
        });
    }, []);

    /*
     * Note editing
     */

    const addNote = (text) => {
        let date = (new Date(Date.now())).toLocaleString();
        const newNote = {
            text: text,
            date: date
        }

        let newNotes = [...notes];

        newNotes.unshift(newNote);
        setNotes(newNotes);

        //server call
        createNoteAPIMethod(newNote);
        setServerCall(!serverCall);
    }

    const editNoteText = (newText) => {
        let newNotes = [];
        const date = (new Date(Date.now())).toLocaleString();
        let newNote = {
            text: newText,
            date: date
        }

        newNotes = notes.filter(note => note._id !== activeNote);
        newNotes.unshift(newNote);
        setNotes(newNotes);

        //updateNoteAPIMethod(newNote, activeNote);

        //setServerCall(!serverCall);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter(note => note._id !== id);

        setNotes(newNotes);

        if (newNotes.length > 0) {
            //setActiveNote(newNotes[0]._id);
        }
        else {
            setActiveNote('');
            return;
        }

        //server call
        if (notes.length != 0) {
            const note = getNoteByIdAPIMethod(id);
            deleteNoteByIdAPIMethod(id);
        }
    }

    const getActiveNote = () => {
        return notes.find(note => note._id === activeNote);
    }

    /*
     * Local storage saving
     */

    /*
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

    */


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
