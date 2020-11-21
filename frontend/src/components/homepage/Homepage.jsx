import React from 'react';

// custom components
import Navbar from "../navigation/Navbar";
import Main from "./Main";
import About from "./About";

function Homepage() {

    return (
        <div>
            <Navbar />
            <Main />
            <About />
        </div>
    )

}

export default Homepage;