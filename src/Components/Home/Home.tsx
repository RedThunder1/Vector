import react from 'react'
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
    return (
        <>
            <div className="home">
                <div className="title_container">
                    <h1 className="title">Welcome to Vector</h1>
                    <p>Your go to for Tasks and Notes!</p>
                </div>
                <div className="quick_start">
                    <div className="quick_list">
                        <h3>Create a Todo List</h3>
                        <p>Create a Todo List to track and manage tasks.</p>
                        <Link to='/list'><button className="quick_button" type="button">New Todo List</button></Link>
                    </div>
                    <div className="quick_note">
                        <h3>Create a Note</h3>
                        <p>Create a new Note to write down<br/>and save anything you want.</p>
                        <Link to='notes'><button className="quick_button" type="button">New Note</button></Link>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Home