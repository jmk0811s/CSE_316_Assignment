import './../Profile.css'
import React from "react"
import Close from "@material-ui/icons/Close";

function Profile({setShowProfile}) {
    return (
        <div id="profile" className="profile">
            <form className="profile-content" action="" method="POST">
                <div className="container">
                    <div className="wrapper0">
                        <h1 className="profile-title">Edit Profile</h1>
                        <Close className="close-icon" onClick={() => setShowProfile(false)}></Close>
                    </div>
                    <div className="wrapper1">
                        <button className="profile_pic_2"></button>
                        <button className="change-image">Choose New Image</button>
                        <button className="remove-image">Remove Image</button>
                    </div>
                    <div className="wrapper2">
                        <b>Name</b>
                        <input className="profile-input" type="text" placeholder="Minki Jeon" name="name"></input>
                        <b>E-mail</b>
                        <input className="profile-input" type="text" placeholder="minki.jeon@stonybrook.edu"name="email"></input>
                        <b>Location</b>
                        <input className="profile-input" type="text" placeholder="Incheon Songdo" name="location"></input>
                    </div>
                    <div className="wrapper3">
                        <button className="save" type="submit" className="save">Save</button>
                        <button className="logout" type="button" className="logout">Logout</button>
                    </div>
                </div>
            </form>
            <div className="profile-background" onClick={() => setShowProfile(false)}></div>
        </div>
    );
}

export default Profile;