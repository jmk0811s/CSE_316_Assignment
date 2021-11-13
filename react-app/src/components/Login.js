import React from "react";
import {useState}  from "react";
import Signup from "./Signup";
import {loginUserAPIMethod} from "../api/client";

function Login({setLogin, serverCall, setServerCall, setShowProfile}) {
    const [showSignup, setShowSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let userInfo = {"email": email, "password": password};
        loginUserAPIMethod(userInfo).then((status) => {
            if (status) {
                setShowError(false);
                setLogin(true);
                setShowProfile(false);
                setServerCall(!serverCall);
            }
            else {
                setShowError(true);
            }
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {showSignup ? <Signup
                setLogin={setLogin}
                serverCall={serverCall}
                setServerCall={setServerCall}
                setShowSignup={setShowSignup}
                setShowProfile={setShowProfile}
            /> : null}
            <div className="login-page-wrapper">
                <form className="login-form" action="" method="POST">
                    <h1 className="login-title">Notes</h1>
                    <h2 className="login-subtitle">Organize all your thoughts in one place.</h2>
                    <div className="login-wrapper1">
                        <p>Email</p>
                        <input
                            className="login-email-input"
                            type="text"
                            value={email}
                            placeholder="minki.jeon@stonybrook.edu"
                            name="email"
                            onChange={handleChangeEmail}
                        ></input>
                        <p>Password</p>
                        <input
                            className="login-password-input"
                            type="password"
                            value={password}
                            placeholder="******"
                            name="password"
                            onChange={handleChangePassword}
                        ></input>
                        {showError ? <p style={{color: "red"}}>Error: Invalid email and/or password</p> : <p> </p>}
                        <button className="login-button" type="button" onClick={handleSubmitLogin}>Login</button>
                        <div className="divider"></div>
                        <button className="create-account-button" type="button" onClick={() => setShowSignup(true)}>Create New Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;