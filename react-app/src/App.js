
import './App.css'
import SideBar from "./components/SideBar"
import TextArea from "./components/TextArea"
import Login from "./components/Login"
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
    getCurrentUserAPIMethod,
    updateUserAPIMethod
} from "./api/client"

function App() {
    const [login, setLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
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
        getCurrentUserAPIMethod().then((user) => {
            console.log(user);
            if (user == null) {
                setLogin(false);
            }
            else if (Object.keys(user).length == 0) {
                setLogin(false);
            }
            else {
                setCurrentUser(user);
                setLogin(true);
                setServerCall(!serverCall);
            }
        })
    }, []);

    const getNotes = () => {
        getNotesAPIMethod().then((notes) => {
            console.log("Server Call\n");
            let sortedNotes = sortNotesByDate(notes);
            setNotes(sortedNotes);
            if (sortedNotes.length != 0) setActiveNote(sortedNotes[0]._id);
        });
    }

    useEffect(() => {
        if (login) {
            getNotes();
        }
    }, [serverCall]);

    /*
    //get users from the database
    useEffect(() => {
        getUsersAPIMethod().then((users) => {
            //Set default user (will be removed after sign-up function is implemented)
            if (users.length == 0) {
                const defaultUser = {
                    name: 'Minki Jeon',
                    email: 'minki.jeon@stonybrook.edu',
                    location: 'Incheon Songdo',
                    profile_url: ''
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

     */

    /*
     * Note editing
     */

    const addNote = (text) => {
        let date = Date.now();
        const newNote = {
            text: text,
            lastUpdatedDate: date
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
        currNote.lastUpdatedDate = date;

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
        if (activeNote == '' || activeNote == undefined) return;

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
        sortedList = notes.sort((a, b) => Date.parse(b.lastUpdatedDate) - Date.parse(a.lastUpdatedDate));
        console.log();
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
        if (!login) {
            //login page, width > 500
            return (
                <Login
                    setLogin={setLogin}
                    serverCall={serverCall}
                    setServerCall={setServerCall}
                />
            );
        }
        else {
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
                                serverCall={serverCall}
                                setServerCall={setServerCall}
                                setLogin={setLogin}
                                showProfile={showProfile}
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
                                serverCall={serverCall}
                                setServerCall={setServerCall}
                                setLogin={setLogin}
                                showProfile={showProfile}
                            /> : null
                        }
                    </div>
                );
            }
        }
    }
    else {
        if (!login) {
            //login page, width <= 500
            return (
                <Login
                    setLogin={setLogin}
                    serverCall={serverCall}
                    setServerCall={setServerCall}
                />
            );
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
                            serverCall={serverCall}
                            setServerCall={setServerCall}
                            setLogin={setLogin}
                            showProfile={showProfile}
                        /> : null
                    }
                </div>
            );
        }
    }
}

export default App;
