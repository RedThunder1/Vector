import react, {useState} from "react";
import "./Account.css"
import axios from "axios";
import React from "react";

function Account() {
    const [identifier, setIdentifier] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                identifier: identifier,
                password: password,
                withCredentials: true
            })
            console.log(response)
        } catch (error) {
            //Show error on screen

            console.error('Failed to submit login data', error)
        }
    }

    return (
        <div className="account">
            <div className="account_panel">
                <form className="account_form" id="account_form" method="POST" onSubmit={(e) => {handleSubmit(e)}}>

                    <h2>Account Login</h2>
                    <input id="identifier"
                           value={identifier}
                           onChange={(e) => setIdentifier(e.target.value)}
                           name="identifier"
                           className="account_identifier"
                           placeholder="Username or Email" required />
                    <p className="identifier_warning">You need a Username or Email!</p>
                    <input id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password"
                           name="password"
                           className="account_password"
                           placeholder="Password" required />
                    <input type="submit" value="Login"/>

                </form>
            </div>
        </div>
    )
}

export default Account;