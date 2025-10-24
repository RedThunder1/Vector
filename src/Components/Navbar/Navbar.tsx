import react, {useEffect} from 'react'
import "./Navbar.css"
// @ts-ignore idk why it errors
import Logo from "../../Graphics/VectorLogo.png"
import { Link } from "react-router-dom";

function Navbar() {
    let name = ""
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (user !== null) {
            name = user[1]
        }
    },[])

    return (
        <div className="navbar">
            <Link className="Link" to="/"><img src={Logo} alt="Vector Logo"></img></Link>
            <Link className="Link" to="/"><div className="home_tab navbar_tab">Home</div></Link>
            <Link className="Link" to="/files"><div className="lists_tab navbar_tab">Files</div></Link>
            <div className="utility_tabs">
                <p>{name}</p>
                <Link className="Link" to="/account"><div className="account_tab">Account</div></Link>
                <div className="settings_tab">Settings</div>
            </div>

        </div>
    )
}

export default Navbar;