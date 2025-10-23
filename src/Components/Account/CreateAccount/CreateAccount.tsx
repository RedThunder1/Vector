import './CreateAccount.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function CreateAccount() {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        //Check if login data is still stored to log back in
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const error_header = document.getElementById("error_header") as HTMLDivElement
        const password_error = document.getElementById("password_error") as HTMLParagraphElement

        error_header.style.display = "none";

        if (password !== (document.getElementById("confirm_password") as HTMLInputElement).value) {
            password_error.style.display = "block";
            return;
        }
        password_error.style.display = "none";


        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/login/', {
                UUID: uuidv4(),
                Username: username,
                Email: email,
                Password: password,
            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
                .then((response) => {
                    console.log(response.data.message)
                    if(response.data.message === "login successful") {
                        const user: Array<string> = response.data.user
                        localStorage.setItem("user", JSON.stringify(user));
                    } else {
                        error_header.innerText = "Login unsuccessful. The username or password was incorrect."
                        error_header.style.display = "block"
                    }
                })

        } catch (error) {
            //Show error on screen
            error_header.innerText = "There was an error trying to log in. Try again."
            error_header.style.display = "block"
        }
    }

    return (
        <div className='create_account'>
            <div className="account_panel">
                <form className="account_form" id="account_form" method="POST" onSubmit={(e) => {handleSubmit(e)}}>

                    <h2>Create Account</h2>
                    <div className="error_header" id="error_header">
                        There was an error while trying to create account! Please try again!
                    </div>
                    <input id="identifier"
                           value={username}
                           onChange={(e) => setUsername(e.target.value) }
                           name="identifier"
                           className="account_identifier"
                           placeholder="Username or Email" required />

                    <input id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                        name="email"
                        className="account_identifier"
                        placeholder="Email" required />

                    <br/>
                    <p id="password_error">Passwords don't match!</p>
                    <input id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password"
                           name="password"
                           className="account_password"
                           placeholder="Password" required />
                    <input id="confirm_password"
                        type="password"
                        name="verify_password"
                        className="account_password"
                        placeholder="Confirm Password" required />

                    <br/>

                    <input type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )}

export default CreateAccount;