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

function SideBar({notes, handleAddNote, handleDeleteNote, activeNoteID, setActiveNote, setShowProfile, setShowSideBar,
                 searchQuery, setSearchQuery, defaultImage, imageURL}) {

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        let filteredList = notes.filter(note => note.text.includes(e.target.value));
        let filteredListId = [...filteredList.map((note) => note._id)];

        console.log();

        if (!filteredListId.includes(activeNoteID)) {
            if (filteredListId.length == 0) {
                setActiveNote((function () { return; })());
                return;
            }
            let filterNoteId = filteredList[0]._id;
            setActiveNote(filterNoteId);
        }
    }

    return (
        <div className="AppBody">
            <div className="sidebar">
                <div className="menu">
                    <button
                        className="profile_pic"
                        onClick={() => setShowProfile(true)}
                        style={{backgroundImage: `url(${defaultImage ? 'default_profile_image.png' : imageURL})`}}
                    ></button>
                    <text className="title">My Notes</text>
                    <DeleteIcon handleDeleteNote={handleDeleteNote} activeNoteID={activeNoteID}/>
                </div>
                <div className="searchbox">
                    <SearchIcon/>
                    <input className="search-input"
                           type="text"
                           value={searchQuery}
                           placeholder="Search all notes"
                           onChange={handleChange}
                    ></input>
                </div>

                <div id="note-container" className="note-container">
                    <NoteList
                        notes={notes}
                        handleAddNote={handleAddNote}
                        activeNoteID={activeNoteID}
                        setActiveNote={setActiveNote}
                        setShowSideBar={setShowSideBar}
                        searchQuery={searchQuery}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
