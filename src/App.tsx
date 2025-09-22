import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home"

function App() {
  return (
    <>
        <Navbar/>
        <main>
            <Routes>
                <Route index element={<Home/>} />
            </Routes>
        </main>
    </>
  );
}

export default App;
