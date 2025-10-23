import react, {useEffect, useState} from "react";
import "./Account.css"
import axios from "axios";
import Cookies from "universal-cookie";
import {Link, useNavigate} from "react-router-dom";

function Account() {
    const [identifier, setIdentifier] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const nav = useNavigate();

    useEffect(() => {
        //Check if login data is still stored to log back in
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        let error_header = document.getElementById("error_header") as HTMLDivElement
        error_header.style.display = "none";

        e.preventDefault()
        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/login/', {
                identifier: identifier,
                password: password,
            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
                .then((response) => {
                    console.log(response.data.message)
                    if(response.data.message === "login successful") {
                        const user: Array<string> = response.data.user
                        localStorage.setItem("user", JSON.stringify(user));
                        nav('/')
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
        <div className="account">
            <div className="account_panel">
                <form className="account_form" id="account_form" method="POST" onSubmit={(e) => {handleSubmit(e)}}>

                    <h2>Account Login</h2>
                    <div className="error_header" id="error_header">
                        There was an error while trying to login! Please try again!
                    </div>
                    <input id="identifier"
                           value={identifier}
                           onChange={(e) => setIdentifier(e.target.value) }
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

                <div className="dev_account">
                    For testing purposes, so you don't need to make an account:
                    <br/>DevAccount
                    <br/>devaccount
                </div>
                <Link to={'/account/create'}><div className="create_account_button">Create Account</div></Link>
            </div>
        </div>
    )
}

export default Account;