import react, {useEffect} from 'react';
import './Files.css'
import axios from "axios";
import Cookies from "universal-cookie";

function Files() {

    let user: string | null = localStorage.getItem('user')

    async function loadAllLists() {
        if (user === null) return
        const cookies = new Cookies()
        const response = await axios.post('/api/lists/loadall/',{
            UserUUID: user.substring(2,37),
        }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
            .then(response => {

            })
    }

    useEffect(() => {
        loadAllLists()
    }, [])

    return (
        <div className="files">
            <div className="files_todo_lists">
                <p>Todo Lists</p>
                <div className="l_arrow">&lt;</div>
                <div className="r_arrow">&gt;</div>
                <div className=""></div>
            </div>
            <div className="files_notes">
                <p>Notes</p>
                <div className="l_arrow">&lt;</div>
                <div className="r_arrow">&gt;</div>

            </div>
        </div>
    )
}

export default Files;