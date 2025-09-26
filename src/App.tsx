import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home"
import Files from "./Components/Files/Files";

function App() {
  return (
    <>
        <Navbar/>
        <main>
            <Routes>
                <Route index element={<Home/>} />
                <Route path="/Files" element={<Files/>} />
            </Routes>
        </main>
    </>
  );
}

export default App;
