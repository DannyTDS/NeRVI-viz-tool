import React from "react";

import Header from "./components/Header";
import AppBody from "./components/AppBody/AppBody";

import "./App.css";

function App() {
    return (
        <div id="app">
            <Header />
            <AppBody />
            <footer> &copy; 2023 Pengfei Gu, Ziang Tong. Made with React.js 18.1.0.</footer>
        </div>
    );
}

export default App;
