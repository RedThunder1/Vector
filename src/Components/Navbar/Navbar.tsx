import react from 'react'
import "./Navbar.css"
import Logo from '../../Graphics/VectorLogo.png'

function Navbar() {
    return (
        <div className="navbar">
            <img src={Logo} alt="Vector Logo"></img>
            <div className="home_tab navbar_tab">Home</div>
            <div className="lists_tab navbar_tab">Todo Lists</div>
            <div className="notes_tab navbar_tab">Notes</div>
            <div className="utility_tabs">
                <div className="account_tab">Account</div>
                <div className="settings_tab">Settings</div>
            </div>

        </div>
    )
}

export default Navbar;