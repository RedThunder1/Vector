import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home"
import Files from "./Components/Files/Files";
import Notes from "./Components/Notes/Notes";
import List from "./Components/List/List";

function App() {
  return (
    <>
        <Navbar/>
        <main>
            <Routes>
                <Route index element={<Home/>} />
                <Route path="/files" element={<Files/>} />
                <Route path="/notes" element={<Notes/>} />
                <Route path='/list' element={<List/>} />
            </Routes>
        </main>
    </>
  );
}

export default App;
