import React from "react"
import './List.css'
import {createPortal} from "react-dom";
import {render} from "@testing-library/react";

function List() {

    return (
        <div className="list" id="list">
            <div className='list_toolbar'>
                <h2>ToolBar</h2>
                <input id='list_title' type='text' placeholder='List Title'/>
                <div className="new_section_button" onClick={() => {openSectionCreationPanel()}}>New Section</div>
            </div>

            {//Placeholder for Dev
            }
            <div className='list_container' id='list_container'>
                <div className='list_section'>
                    <div className='list_section_header'><h3>Section Header</h3> <div className="new_task_button" onClick={(e) => {openTaskCreationPanel(e)}}>New</div> </div>
                    <div className='list_section_items'>
                        <div className='list_section_item'>
                            <div className='list_item_title'>
                                TITLE
                                <div className='remove_list_item'>X</div>
                            </div>
                            <div className='list_item_desc'>This is an interesting description</div>
                            <div className='list_item_tags'>
                                <div className='list_item_tag'>IMPORTANT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function saveList() {

}

function loadList() {

}

function createTask(section: HTMLDivElement, name: string, description: string) {
    document.getElementById("create_panel")!!.remove()
    const task = (
        <div className='list_section_item'>
            <div className='list_item_title'>
                {name}
                <div className='remove_list_item'>X</div>
            </div>
            <div className='list_item_desc'>{description}</div>
            <div className='list_item_tags'>
            </div>
        </div>
    );

    render(createPortal(task, section));
}

function openTaskCreationPanel(e: React.MouseEvent<HTMLDivElement>) {
    const section = ((e.target as HTMLDivElement).parentElement as HTMLDivElement).parentElement as HTMLDivElement;
    const list_element = document.getElementById('list') as HTMLDivElement;

    const create_panel = (<div className="create_panel" id="create_panel">
                            <h2>Create New Task</h2>
                            <div className="create_panel_items">
                              <input className="create_name" id="task_name" type="text" placeholder="Task Name"/>
                              <textarea className="task_desc" id="task_desc" placeholder="Task Description"></textarea>
                              <div className="create_button" onClick={() => {createTask(section, (document.getElementById("task_name") as HTMLInputElement).value, (document.getElementById("task_desc") as HTMLInputElement).value )}}>Create Task</div>
                            </div>
                          </div>
    );
    render(createPortal(create_panel, list_element));

}



function deleteListItem() {

}

function createListSection(name: string) {
    document.getElementById("create_panel")!!.remove()
    const section_container = document.getElementById('list_container') as HTMLDivElement;
    const list_section = (
        <div className='list_section' id='list_section'>
            <div className='list_section_header'><h3>{name}</h3> <div className="new_task_button" onClick={(e) => {openTaskCreationPanel(e)}}>New</div> </div>
            <div className='list_section_items'>
            </div>
        </div>
    );
    render(createPortal(list_section, section_container));
}

function openSectionCreationPanel() {
    const list_element = document.getElementById('list') as HTMLDivElement;
    const create_panel = (<div className="create_panel" id="create_panel">
            <h2>Enter Section Name</h2>
            <div className="create_panel_items">
                <input className="create_name" id="section_name" type="text" placeholder="Section Name"/>
                <div className="create_button" onClick={() => {createListSection((document.getElementById("section_name") as HTMLInputElement).value)}}>Create Task</div>
            </div>
        </div>
    );
    render(createPortal(create_panel, list_element));
}

function deleteListSection() {

}


export default List