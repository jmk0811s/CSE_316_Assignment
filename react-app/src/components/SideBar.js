import React from "react"
import Search from '@material-ui/icons/Search'
import Delete from "@material-ui/icons/Delete"
import Notes from "./Notes"

const SearchIcon = () => {
    return (
        <div>
            <Search className="search-icon"></Search>
        </div>
    );
}

const DeleteIcon = () => {
    return (
        <div>
            <Delete className="delete-icon"></Delete>
        </div>
    );
}

function SideBar() {
    return (
        <div className="sidebar">
            <div className="menu">
                <button className="profile_pic"></button>
                <text className="title">My Notes</text>
                <DeleteIcon />
            </div>
            <div className="searchbox">
                <SearchIcon />
                <input className="search-input" type="text" placeholder="Search all notes"></input>
            </div>

            <div id="note-container" className="note-container">
                <Notes />
            </div>
        </div>
    );
}

export default SideBar;
