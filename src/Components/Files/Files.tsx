import react from 'react';
import './Files.css'

function Files() {
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