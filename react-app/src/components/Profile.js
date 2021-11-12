import './../Profile.css';
import React from "react";
import Close from "@material-ui/icons/Close";
import {useState, useEffect}  from "react";
import {updateUserAPIMethod, logoutUserAPIMethod, getCurrentUserAPIMethod} from "../api/client";
import {uploadImageToCloudinaryAPIMethod} from "../api/client";

function Profile({setShowProfile, profile, setProfile, profileUpdated, setProfileUpdated, serverCall, setServerCall, setLogin, showProfile}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        getCurrentUserAPIMethod().then((user) => {
            setName(user.name);
            setEmail(user.email);
            setLocation(user.location);
        })
    }, [showProfile]);

    const handleImageSelected = (event) => {
        console.log("New file selected");
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            const unsignedUploadPreset = 'euuinjpp'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                // Now the URL gets saved to the author
                //const updatedAuthor = {...author, "profile_url": response.url};
                //setAuthor(updatedAuthor);

                // Now we want to make sure this is updated on the server – either the
                // user needs to click the submit button, or we could trigger the server call here
            });
        }
    }

    const handleLogout = () => {
        logoutUserAPIMethod({});
        setLogin(false);
        setServerCall(!serverCall);
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
                        <input className="change-image"
                                type="file"
                                name="image"
                                accept="image/*"
                                id="cloudinary"
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleImageSelected(e);
                                }}
                        />
                        <button className="remove-image">Remove Image</button>
                    </div>
                    <div className="wrapper2-profile">
                        <b>Name</b>
                        <input
                            className="profile-input"
                            type="text"
                            value={name}
                            placeholder="Minki Jeon"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <b>E-mail</b>
                        <input
                            className="profile-input"
                            type="text"
                            value={email}
                            placeholder="minki.jeon@stonybrook.edu"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <b>Location</b>
                        <input
                            className="profile-input"
                            type="text"
                            value={location}
                            placeholder="Incheon Songdo"
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    </div>
                    <div className="wrapper3">
                        <button
                            className="save"
                            type="submit"
                            className="save"
                            onClick={(e) => {
                                    //setProfileUpdated(!profileUpdated);
                                    e.preventDefault();
                                    setShowProfile(false);
                                    getCurrentUserAPIMethod().then((user) => {
                                        console.log(user);
                                        user.name = name;
                                        user.email = email;
                                        user.location = location;
                                        console.log(user);
                                        updateUserAPIMethod(user);
                                    });
                            }}
                        >Save</button>
                        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </form>
            <div className="profile-background" onClick={() => setShowProfile(false)}></div>
        </div>
    );
}

export default Profile;