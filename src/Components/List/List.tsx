import React, {ChangeEvent, useEffect} from "react"
import './List.css'
import {createPortal} from "react-dom";
import {render} from "@testing-library/react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from 'uuid';

class Tag {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

class Task {
    name: string;
    description: string;
    tags: Array<Tag>;

    constructor(name: string, description: string, tags: Array<Tag>) {
        this.name = name;
        this.description = description;
        this.tags = tags;
    }
}

class Section {
    name: string;
    tasks: Array<Task>;

    constructor(name: string, tasks: Array<Task>) {
        this.name = name;
        this.tasks = tasks;
    }
}

class TodoList {
    uuid: string
    name: string;
    sections: Array<Section>;
    tags: Array<Tag>;

    constructor(uuid: string, name: string, sections: Array<Section>, tags: Array<Tag>) {
        this.uuid = uuid;
        this.name = name;
        this.sections = sections;
        this.tags = tags;
    }
}

let todolist: TodoList;

let uuid: string;

function List() {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        //Create method to log in and be redirected back

        if (todolist.sections.length > 0) {
            saveList()
        }

        e.preventDefault();
        e.returnValue = '';
    }

    const handleTitleChange = (e: ChangeEvent) => {
        todolist.name = (e.target as HTMLInputElement).value;
    }

    async function loadList() {
        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/lists/load/', {
                ListUUID: uuid,
            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
                .then((response) => {
                    let loaded_list = JSON.parse(response.data[0][3]);
                    todolist = new TodoList(
                        loaded_list.uuid,
                        loaded_list.name,
                        loaded_list.sections.map((s: any) =>
                            new Section(
                                s.name,
                                [...s.tasks.map((t: any) => new Task(
                                        t.name,
                                        t.description,
                                        [...t.tags.map((tg: any) => new Tag(tg.name, tg.color))]))])),
                        [...loaded_list.tags.map((tg: any) => new Tag(tg.name, tg.color))]
                    );

                    todolist = new TodoList(loaded_list.uuid, loaded_list.name, loaded_list.sections, loaded_list.tags);
                    //render all sections and tasks
                    (document.getElementById("list_title") as HTMLInputElement).value = todolist.name;
                    todolist.sections.forEach((section, sec_index) => {
                        createListSection(section.name);
                        const section_div = document.getElementById("list_container")!!.children[sec_index] as HTMLDivElement;
                        section.tasks.forEach((task, task_index) => {
                            createTask(section_div, task.name, task.description)
                        })
                    })
                })
        } catch (error) {
            console.error(error)
        }
    }

    async function saveList() {
        let user: string | null = localStorage.getItem('user')
        if (user === null) {
            //show error saying you need to log in and ensure list is saved so it's not lost
            console.log('You must be logged in to save!')
            return;
        }

        try {
            const cookies = new Cookies()
            const response = await axios.post('/api/lists/save/', {
                ListUUID: todolist.uuid,
                UserUUID: user.substring(2,37),
                Name: todolist.name,
                ListContents: JSON.stringify(todolist)
            }, {withCredentials: true, headers: {"X-CSRFToken": cookies.get("csrftoken")}})
                .then((response) => {
                    //Show error if failed to save.
                })
        } catch (error) {
            //Show failed to save error
        }


    }
    const location = useLocation();
    const state = location.state?.list || null;
    useEffect(() => {

        window.addEventListener('beforeunload', handleBeforeUnload);
        //See if loading or creating new list
        //Loading list
        if (state === 'new') {
            //creating new list
            todolist = new TodoList(uuidv4(), "List", [], [])
        } else {
            //fetch list from backend
            uuid = state
            loadList()
        }
    }, [])

    return (
        <div className="list" id="list">
            <div className='list_toolbar'>
                <h2>ToolBar</h2>
                <input id='list_title' type='text' placeholder='List Title' onChange={handleTitleChange} />
                <div className="new_section_button" onClick={() => {openSectionCreationPanel()}}>New Section</div>
                <div className="save_list_button" onClick={saveList}>Save Todo List</div>
            </div>
            <div className='list_container' id='list_container'></div>
        </div>
    )
}

function deleteListItem(e: React.MouseEvent<HTMLDivElement>) {
    const task = ((e.target as HTMLDivElement).parentElement as HTMLElement).parentElement as HTMLElement;
    const parent = task.parentElement!!;
    const task_index = Array.from(parent.children).indexOf(task);
    const parent_index = Array.from(parent.parentElement!!.children).indexOf(parent);
    console.log(todolist.sections[parent_index].tasks, parent_index, task_index);
    todolist.sections[parent_index].tasks.splice(task_index - 2, 1);
    console.log(todolist.sections[parent_index].tasks);
    task.remove();
}

function createTask(section: HTMLDivElement, name: string, description: string) {
    const task = (
        <div className='list_section_item'>
            <div className='list_item_title'>
                {name}
                <div className='remove_list_item' onClick={(e)=> {deleteListItem(e)}}>X</div>
            </div>
            <div className='list_item_desc'>{description}</div>
            <div className='list_item_tags'>
            </div>
        </div>
    );

    render(createPortal(task, section));
    const index = Array.from(section.parentElement!!.children).indexOf(section);
    let panel = document.getElementById("create_panel")
    if (panel !== null) {
        panel.remove();
        todolist.sections[index].tasks.push(new Task(name, description, []));
    }
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
                              <div className="create_button" onClick={(e) => {((e.target as HTMLDivElement).parentElement)?.parentElement!!.remove()}}>Cancel</div>
                            </div>
                          </div>
    );
    render(createPortal(create_panel, list_element));
}

function openDeleteListSection(e: React.MouseEvent<HTMLDivElement>) {
    const list_element = document.getElementById('list') as HTMLDivElement;
    const section = ((e.target as HTMLDivElement).parentElement as HTMLDivElement).parentElement as HTMLDivElement;
    const warning_panel = (
        <div className="warning_panel">
            <h2>Do you want to delete this section?</h2>
            <div className="delete_panel_button" onClick={(e) => {deleteListSection(section, e)}}>Delete</div>
            <div className="delete_panel_button" onClick={(e) => {(e.target as HTMLDivElement).parentElement!!.remove()}}>Cancel</div>
        </div>
    )
    render(createPortal(warning_panel, list_element));
}

function deleteListSection(section: HTMLDivElement, e: React.MouseEvent<HTMLDivElement>) {
    const index = Array.from(section.parentElement!!.children).indexOf(section);
    todolist.sections.splice(index, 1);
    section.remove();
    (e.target as HTMLDivElement).parentElement!!.remove();
}


function createListSection(name: string) {
    const section_container = document.getElementById('list_container') as HTMLDivElement;
    const list_section = (
        <div className='list_section' id='list_section'>
            <div className='list_section_header'><h3>{name}</h3>
                <div className="new_task_button" onClick={(e) => {openTaskCreationPanel(e)}}>+</div>
                <div className="remove_section_button" onClick={(e) => {openDeleteListSection(e)}}>-</div>
            </div>
            <div className='list_section_items'>
            </div>
        </div>
    );
    render(createPortal(list_section, section_container));
    let panel = document.getElementById("create_panel")
    if (panel !== null) {
        todolist.sections.push(new Section(name, []))
        panel.remove()
    }
}

function openSectionCreationPanel() {
    const list_element = document.getElementById('list') as HTMLDivElement;
    const create_panel = (<div className="create_panel" id="create_panel">
            <h2>Enter Section Name</h2>
            <div className="create_panel_items">
                <input className="create_name" id="section_name" type="text" placeholder="Section Name"/>
                <div className="create_button" onClick={() => {createListSection((document.getElementById("section_name") as HTMLInputElement).value)}}>Create Task</div>
                <div className="create_button" onClick={(e) => {((e.target as HTMLDivElement).parentElement)?.parentElement!!.remove()}}>Cancel</div>
            </div>
        </div>
    );
    render(createPortal(create_panel, list_element));
}

export default List