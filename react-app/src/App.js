
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
    deleteNoteByIdAPIMethod,
    updateUserAPIMethod
} from "./api/client"

function App() {
    const [activeNote, setActiveNote] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const {height, width} = useWindowDimensions();
    const [showSideBar, setShowSideBar] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [serverCall, setServerCall] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [profile, setProfile] = useState([]);

    const [notes, setNotes] = useState([]);

    //get notes from the database
    useEffect(() => {
        getNotesAPIMethod().then((notes) => {
            console.log("Server Call\n");
            let sortedNotes = sortNotesByDate(notes);
            setNotes(sortedNotes);
            //console.dir(notes);
        });
    }, [serverCall]);

    //get users from the database
    useEffect(() => {
        getUsersAPIMethod().then((users) => {
            if (users.length == 0) {
                setProfile(
                    {
                        name: '',
                        email: '',
                        location: ''
                    }
                );
            }
            else {
                setProfile(users[0]);
            }
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
        setSearchQuery('');

        //server call
        createNoteAPIMethod(newNote);
        setServerCall(!serverCall);
    }

    const editNoteText = (newText) => {
        let newNotes = [];
        const date = (new Date(Date.now())).toLocaleString();

        let currNote = notes.filter(note => note._id === activeNote)[0];
        currNote.text = newText;
        currNote.date = date;

        newNotes = notes.filter(note => note._id !== activeNote);
        newNotes.unshift(currNote);
        setNotes(newNotes);

        updateNoteAPIMethod(currNote);

        //setServerCall(!serverCall);
    }

    const deleteNote = (id) => {
        if (activeNote == '') return;

        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);

        if (newNotes.length > 0) {
            setActiveNote(newNotes[0]._id);
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

    const sortNotesByDate = (notes) => {

        return notes;
    }

    const updateProfile = () => {
        setProfile();
    }

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
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
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
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
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
