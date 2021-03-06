import './../Profile.css';
import React from "react";
import Close from "@material-ui/icons/Close";
import {useState, useEffect, useRef}  from "react";
import {updateUserAPIMethod, logoutUserAPIMethod, getCurrentUserAPIMethod} from "../api/client";
import {uploadImageToCloudinaryAPIMethod} from "../api/client";

function Profile({setShowProfile, profile, setProfile, profileUpdated, setProfileUpdated, serverCall, setServerCall, setLogin, showProfile,
                     defaultImage, setDefaultImage, imageURL, setImageURL}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const inputRef = useRef(null);
    const [formData, setFormData] = useState(null);
    const defaultImageURL = "default_profile_image.png";
    const [imageSelected, setImageSelected] = useState(false);
    const [imageRemoved, setImageRemoved] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        getCurrentUserAPIMethod().then((user) => {
            setName(user.name);
            setEmail(user.email);
            setLocation(user.location);
            setShowErrorMessage(false);
        })
    }, [showProfile]);

    const addImage = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }

    const removeImage = (e) => {
        e.preventDefault();
        setFormData(null);
        setImageSelected(false);
        setImageRemoved(true);
    }

    const handleImageSelected = (e) => {
        console.log("New file selected");
        setImageSelected(true);
        setImageRemoved(false);
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            console.dir(selectedFile);
            const formData = new FormData();
            const unsignedUploadPreset = 'nphtjj5p'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);
            setFormData(formData);
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
                        <Close className="close-icon" onClick={() => {setShowProfile(false); setImageSelected(true);}}></Close>
                    </div>
                    <div className="wrapper1">
                        <button
                            className="profile_pic_2"
                            onClick={addImage}
                            style={{backgroundImage: `url(${defaultImage ? defaultImageURL : imageURL})`}}
                        ></button>
                        <input
                            ref={inputRef}
                            type="file"
                            name="image"
                            accept="image/*"
                            id="cloudinary"
                            onChange={handleImageSelected}
                        />
                        <button className="change-image" onClick={addImage}>Choose New Image</button>
                        <button className="remove-image" onClick={removeImage}>Remove Image</button>
                    </div>
                    <div style={{marginLeft: "30px", marginTop: "0", marginBottom: "10px"}}>
                        {imageSelected ? <p style={{color: "green"}}>Image Selected! Press "Save" to apply</p> : <p> </p>}
                        {imageRemoved ? <p style={{color: "green"}}>Image Removed! Press "Save" to apply</p> : <p> </p>}
                        {showErrorMessage ? <p style={{color: "red"}}>Invalid email format</p> : <p> </p>}
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
                                e.preventDefault();
                                if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))) {
                                    setShowErrorMessage(true);
                                }
                                else {
                                    setShowErrorMessage(false);
                                    if (formData != null) {
                                        uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                                            getCurrentUserAPIMethod().then((user) => {
                                                console.log(user);
                                                user.name = name;
                                                user.email = email;
                                                user.location = location;
                                                user.profile_url = response.url;
                                                setImageURL(response.url);
                                                updateUserAPIMethod(user);
                                            });
                                        });
                                        setFormData(null);
                                    }
                                    else {
                                        if (defaultImage == false && imageRemoved == false) {
                                            getCurrentUserAPIMethod().then((user) => {
                                                console.log(user);
                                                user.name = name;
                                                user.email = email;
                                                user.location = location;
                                                user.profile_url = user.profile_url;
                                                setImageURL('');
                                                setDefaultImage(false);
                                                updateUserAPIMethod(user);
                                            });
                                        }
                                        else {
                                            getCurrentUserAPIMethod().then((user) => {
                                                console.log(user);
                                                user.name = name;
                                                user.email = email;
                                                user.location = location;
                                                user.profile_url = '';
                                                setImageURL('');
                                                updateUserAPIMethod(user);
                                            });
                                        }
                                    }
                                    setShowProfile(false);
                                }
                            }}
                        >Save</button>
                        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </form>
            <div className="profile-background" onClick={() => {setShowProfile(false); setImageSelected(true);}}></div>
        </div>
    );
}

export default Profile;