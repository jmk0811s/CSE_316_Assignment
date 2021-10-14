import React from "react"
import Search from '@material-ui/icons/Search'
import Delete from "@material-ui/icons/Delete"
import NoteList from "./NoteList"

const SearchIcon = () => {
    return (
        <div>
            <Search className="search-icon"></Search>
        </div>
    );
}

const DeleteIcon = ({handleDeleteNote, activeNoteID}) => {
    const deleteNote = () => {
        handleDeleteNote(activeNoteID);
    }

    return (
        <div>
            <Delete className="delete-icon" onClick={deleteNote}></Delete>
        </div>
    );
}

function SideBar({notes, handleAddNote, handleDeleteNote, activeNoteID, setActiveNote, setShowProfile, setShowSideBar}) {
    return (
        <div className="AppBody">
            <div className="sidebar">
                <div className="menu">
                    <button className="profile_pic" onClick={() => setShowProfile(true)}></button>
                    <text className="title">My Notes</text>
                    <DeleteIcon handleDeleteNote={handleDeleteNote} activeNoteID={activeNoteID}/>
                </div>
                <div className="searchbox">
                    <SearchIcon/>
                    <input className="search-input" type="text" placeholder="Search all notes"></input>
                </div>

                <div id="note-container" className="note-container">
                    <NoteList
                        notes={notes}
                        handleAddNote={handleAddNote}
                        activeNoteID={activeNoteID}
                        setActiveNote={setActiveNote}
                        setShowSideBar={setShowSideBar}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
