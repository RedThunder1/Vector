import react, {useEffect} from 'react';
import './Files.css'
import axios from "axios";
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";
import {createPortal} from "react-dom";
import {render} from "@testing-library/react";

function Files() {

    let user: string | null = localStorage.getItem('user')

    async function loadAllLists() {
        if (user === null) return
        const cookies = new Cookies()
        const response = await axios.post('/api/lists/loadall/',{
            UserUUID: user.substring(2,37),
        }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
            .then(response => {
                let data = response.data
                if (data.length === 0) {return}
                const container: HTMLDivElement = document.getElementById("files_lists_container")!! as HTMLDivElement
                for (let item of data) {
                    const html = (
                        <Link to={'/list'} state={{list: item[0]}}>
                            <div className="files_list">
                                <h2>{item[2]}</h2>
                            </div>
                        </Link>
                    );
                    render(createPortal(html, container));
                }
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
                <div className="files_lists_container" id="files_lists_container">
                    <div className="files_list">
                        <h2>Name</h2>
                    </div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                    <div className="files_list"></div>
                </div>

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