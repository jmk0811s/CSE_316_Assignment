import React from "react";
import {useState}  from "react";
import Signup from "./Signup";

function Login() {
    const [showSignup, setShowSignup] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value);

    }

    if (showSignup) {
        return (
            <Signup />
        );
    }
    else {
        return (
            <div className="login-page-wrapper">
                <form className="login-form" action="" method="POST">
                <h1>Notes</h1>
                <h2>Organize all your thoughts in one place.</h2>
                <div className="wrapper1">
                    <p>Email</p>
                    <input
                        className="login-email-input"
                        type="text"
                        placeholder="minki.jeon@stonybrook.edu"
                        name="email"
                        onChange={handleChange}
                    ></input>
                    <p>Password</p>
                    <input
                        className="login-password-input"
                        type="text"
                        placeholder="******"
                        name="password"
                        onChange={handleChange}
                    ></input>
                    <button className="login" type="button">Logout</button>
                </div>
                </form>
            </div>
        );
    }
}

export default Login;