import react from 'react'
import "./Navbar.css"
// @ts-ignore idk why it errors
import Logo from "../../Graphics/VectorLogo.png"
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <Link className="Link" to="/"><img src={Logo} alt="Vector Logo"></img></Link>
            <Link className="Link" to="/"><div className="home_tab navbar_tab">Home</div></Link>
            <Link className="Link" to="/Files"><div className="lists_tab navbar_tab">Todo Lists</div></Link>
            <Link className="Link" to="/Files"><div className="notes_tab navbar_tab">Notes</div></Link>
            <div className="utility_tabs">
                <div className="account_tab">Account</div>
                <div className="settings_tab">Settings</div>
            </div>

        </div>
    )
}

export default Navbar;