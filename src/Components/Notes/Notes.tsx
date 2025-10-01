import react from "react";
import "./Notes.css"


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

function save_doc(type: string) {
    //Ensure note is saved with a name
    if ((document.getElementById('note_title') as HTMLInputElement).value === '') { type = 'save as'}
    switch (type) {
        case 'save':
            //Save document with name
        case 'save_as':
           //Save document with new name
    }
}
function Notes() {
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
                    <button onClick={() => {save_doc('save')}}>Save</button>
                    <button onClick={() => {save_doc('save as')}}>Save As</button>
                    <button onClick={download_doc}>Download</button>
                </div>
            </div>
        </div>
    )
}




export default Notes;