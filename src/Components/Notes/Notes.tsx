import react, {useEffect} from "react";
import "./Notes.css"
import Cookies from "universal-cookie";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {v4 as uuidv4} from "uuid";


function align(position: string) {
    document.getElementById('notepad')!!.style.textAlign = position
}

const changeFontSize = (event: { target: { value: any; }; }) => {
    document.getElementById('notepad')!!.style.fontSize = event.target.value + 'px'
}

function download_doc() {
    var doc = new Blob([(document.getElementById('notepad') as HTMLTextAreaElement).value],{type: 'text/plain'})
    let download: HTMLAnchorElement = document.createElement('a')
    download.setAttribute("download", "filename.txt")
    download.href = URL.createObjectURL(doc)
    download.click()
}

let name: string;
let uuid: string;

function Notes() {

    async function loadNote() {
        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/notes/load/', {
                NoteUUID: uuid,
            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
                .then((response) => {
                    let data = response.data[0]
                    uuid = data[0]
                    name = data[2]
                    (document.getElementById('notepad') as HTMLTextAreaElement).value = data[4]

                })
        } catch (error) {
            console.error(error)
        }
    }

    async function saveNote() {
        let user: string | null = localStorage.getItem('user')
        if (user === null) {
            console.log('You must be logged in to save!')
            return;
        }

        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/notes/save/', {
                NoteUUID: uuid,
                UserUUID: localStorage.getItem('user')!!.substring(2,37),
                Name: name,
                NoteSettings: "temp",
                NoteContents: (document.getElementById("notepad") as HTMLTextAreaElement).value,

            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})

        } catch (error) {
            console.error(error)
        }
    }
        const location = useLocation();
        const state = location.state?.note || null;
        useEffect(() => {

            //See if loading or creating new note
            //Loading note
            if (state === 'new') {
                //creating new note
                uuid = uuidv4();
                name = "Note"
            } else {
                //fetch list from backend
                uuid = state
                loadNote()
            }
        }, [])


    return (
        <div className="notes">
            <textarea className="notepad" id="notepad"/>
            <div className='toolbar'>
                <h2>ToolBar</h2>
                <input id='note_title' type='text' placeholder='Note Title'/>
                <div className="tb_text_align">
                    <label>Left<input id="tb_ta_left" name="state-d" type="radio" onClick={() => {align('left')}}/></label>
                    <label>Center<input id="tb_ta_center" name="state-d" type="radio" onClick={() => {align('center')}}/></label>
                    <label>Right<input id="tb_ta_right" name="state-d" type="radio" onClick={() => {align('right')}}/></label>
                </div>
                <div className="tb_font">
                    <label>Font Size<input className='tb_font_size' id='tb_font_size' type="number" defaultValue='12' min="0" step="1" max='30' onChange={changeFontSize}/></label>
                </div>
                <div className='save_functions'>
                    <button onClick={() => {saveNote()}}>Save</button>
                    <button onClick={download_doc}>Download</button>
                </div>
            </div>
        </div>
    )
}




export default Notes;