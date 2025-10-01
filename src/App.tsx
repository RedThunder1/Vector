import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home"
import Files from "./Components/Files/Files";
import Notes from "./Components/Notes/Notes";

function App() {
  return (
    <>
        <Navbar/>
        <main>
            <Routes>
                <Route index element={<Home/>} />
                <Route path="/Files" element={<Files/>} />
                <Route path="/Notes" element={<Notes/>} />
            </Routes>
        </main>
    </>
  );
}

export default App;
