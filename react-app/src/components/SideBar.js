import React, {useState} from "react"
import Search from '@material-ui/icons/Search'
import Delete from "@material-ui/icons/Delete"
import NoteList from "./NoteList"
import Profile from "./Profile"

const SearchIcon = () => {
    return (
        <div>
            <Search className="search-icon"></Search>
        </div>
    );
}

const DeleteIcon = ({notes, handleDeleteNote, activeNoteID}) => {
    const deleteNote = () => {
        handleDeleteNote(activeNoteID);
    }

    return (
        <div>
            <Delete className="delete-icon" onClick={deleteNote}></Delete>
        </div>
    );
}

function SideBar({notes, handleAddNote, handleDeleteNote, activeNoteID, setActiveNote}) {
    return (
        <div className="AppBody">
            <div className="sidebar">
                <div className="menu">
                    <button className="profile_pic"></button>
                    <text className="title">My Notes</text>
                    <DeleteIcon notes={notes} handleDeleteNote={handleDeleteNote} activeNoteID={activeNoteID}/>
                </div>
                <div className="searchbox">
                    <SearchIcon />
                    <input className="search-input" type="text" placeholder="Search all notes"></input>
                </div>

                <div id="note-container" className="note-container">
                    <NoteList
                        notes={notes}
                        handleAddNote={handleAddNote}
                        activeNoteID={activeNoteID}
                        setActiveNote={setActiveNote}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
