
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import React, {useState, useEffect, useCallback}  from "react"
import Profile from "./components/Profile"
import useWindowDimensions from "./components/WindowDimension"
import {
    getUsersAPIMethod,
    createNoteAPIMethod,
    createUserAPIMethod,
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
            setActiveNote(sortedNotes[0]._id);
            //console.dir(notes);
        });
    }, [serverCall]);

    //get users from the database
    useEffect(() => {
        getUsersAPIMethod().then((users) => {
            //Set default user (will be removed after sign-up function is implemented)
            if (users.length == 0) {
                const defaultUser = {
                    name: 'Minki Jeon',
                    email: 'minki.jeon@stonybrook.edu',
                    location: 'Incheon Songdo'
                }
                setProfile(defaultUser);
                createUserAPIMethod(defaultUser);
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
        let date = Date.now();
        const newNote = {
            text: text,
            date: date
        }

        let newNotes = [...notes];

        newNotes.unshift(newNote);
        setNotes(newNotes);
        setSearchQuery('');

        //server call
        createNoteAPIMethod(newNote).then(() => {
            setServerCall(!serverCall);
        });
    }

    const editNoteText = (newText, serverCallFlag, notesList, activeNoteId) => {
        let newNotes = [];
        const date = Date.now();

        let currNote = notesList.filter(note => note._id === activeNoteId)[0];

        currNote.text = newText;
        currNote.date = date;

        newNotes = notesList.filter(note => note._id !== activeNoteId);
        newNotes.unshift(currNote);
        setNotes(newNotes);

        console.log(currNote);
        if (serverCallFlag) {
            updateNoteAPIMethod(currNote);
            console.log("server note updated");
        }
    }

    const deleteNote = (id) => {
        if (activeNote == '') return;

        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);

        //server call
        if (notes.length != 0) {
            const note = getNoteByIdAPIMethod(id);
            deleteNoteByIdAPIMethod(id);
        }

        if (newNotes.length > 0) {
            setActiveNote(newNotes[0]._id);
        }
        else {
            setActiveNote('');
            return;
        }
    }

    const getActiveNote = () => {
        return notes.find(note => note._id === activeNote);
    }

    const sortNotesByDate = (notes) => {
        let sortedList = [];
        sortedList = notes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        console.log("list sorted");
        return sortedList;
    }

    function debounce(func, timeout = 1000){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    const saveNoteToServer = useCallback( debounce((newText, notesList, activeNoteId) => {
        editNoteText(newText, true, notesList, activeNoteId);
    }), []);

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
                        notes={notes}
                        handleAddNote={addNote}
                        handleChangeNote={editNoteText}
                        activeNote={getActiveNote()}
                        setShowSideBar={setShowSideBar}
                        saveNoteToServer={saveNoteToServer}
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
                    notes={notes}
                    handleAddNote={addNote}
                    handleChangeNote={editNoteText}
                    activeNote={getActiveNote()}
                    setShowSideBar={setShowSideBar}
                    saveNoteToServer={saveNoteToServer}
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
