import './../Profile.css';
import React from "react";
import Close from "@material-ui/icons/Close";
import {updateUserAPIMethod} from "../api/client";

function Profile({setShowProfile, profile, setProfile, profileUpdated, setProfileUpdated}) {
    const updateName = (newName) => {
        profile.name = newName;
        setProfileUpdated(!profileUpdated);
    }

    const updateEmail = (newEmail) => {
        profile.email = newEmail;
        setProfileUpdated(!profileUpdated);
    }

    const updateLocation = (newLocation) => {
        profile.location = newLocation;
        setProfileUpdated(!profileUpdated);
    }

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
                        <input
                            className="profile-input"
                            type="text"
                            value={profile.name}
                            placeholder="Minki Jeon"
                            name="name"
                            onChange={(e) => updateName(e.target.value)}
                        ></input>
                        <b>E-mail</b>
                        <input
                            className="profile-input"
                            type="text"
                            value={profile.email}
                            placeholder="minki.jeon@stonybrook.edu"
                            name="email"
                            onChange={(e) => updateEmail(e.target.value)}
                        ></input>
                        <b>Location</b>
                        <input
                            className="profile-input"
                            type="text"
                            value={profile.location}
                            placeholder="Incheon Songdo"
                            name="location"
                            onChange={(e) => updateLocation(e.target.value)}
                        ></input>
                    </div>
                    <div className="wrapper3">
                        <button
                            className="save"
                            type="submit"
                            className="save"
                            onClick={(e) => {
                                    setProfileUpdated(!profileUpdated);
                                    e.preventDefault();
                                    setShowProfile(false);
                                    console.log(profile);
                                    updateUserAPIMethod(profile);
                            }}
                        >Save</button>
                        <button className="logout" type="button" className="logout">Logout</button>
                    </div>
                </div>
            </form>
            <div className="profile-background" onClick={() => setShowProfile(false)}></div>
        </div>
    );
}

export default Profile;