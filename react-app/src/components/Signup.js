import React from "react";
import {useState}  from "react";
import Close from "@material-ui/icons/Close";
import {createUserAPIMethod} from "../api/client";

function Signup({setLogin, serverCall, setServerCall, setShowSignup}) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        //email validation
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            let userInfo = {"name": name, "email": email, "password": password};
            console.log(userInfo);
            createUserAPIMethod(userInfo).then((status) => {
                if (status) {
                    setShowError(false);
                    setLogin(true);
                    setServerCall(!serverCall);
                }
                else {
                    setErrorMessage("Error: Invalid email and/or password");
                    setShowError(true);
                }
            });
        }
        else {
            setErrorMessage("Error: Invalid email address format");
            setShowError(true);
        }
    }

    return (
        <div className="signup-background">
            <form className="signup-wrapper1" action="" method="POST">
                <div className="signup-container">
                    <div className="wrapper0">
                        <h1 className="profile-title">Sign Up</h1>
                        <Close className="close-icon" onClick={() => setShowSignup(false)}></Close>
                    </div>
                    <div className="wrapper2">
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
                        <b>Password</b>
                        <input
                            className="profile-input"
                            type="password"
                            value={password}
                            placeholder="******"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="wrapper3">
                        {showError ? <p className="error-message" style={{color: "red"}}>{errorMessage}</p> : <p> </p>}
                        <button
                            className="signup-button"
                            type="submit"
                            onClick={handleSubmitSignup}
                        >Sign Up</button>
                    </div>
                </div>
            </form>
            <div className="profile-background" onClick={() => setShowSignup(false)}></div>
        </div>

    );
}

export default Signup;