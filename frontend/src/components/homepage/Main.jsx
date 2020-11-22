import React from 'react';

// styling
import './Main.css';

// images
import man_desk from '../../media/images/man_desk_homepage.png';

// constant
import {
    MAIN_CONTENT_SUBTEXT
} from "../navigation/constants";

function Main() {

    return(
        <div className="main-homepage container">
            <div className="main-content-homepage">
                <div className="main-content-text">
                    <h1 className="main-content-slogan">
                        Increase productivity. <br/>
                        Improve mental health. <br/>
                        Track good habits. <br/>
                    </h1>
                    <p className="main-content-subtext">
                        {MAIN_CONTENT_SUBTEXT}
                    </p>
                </div>
                <div>
                    <img className="home-img" src={man_desk} alt=""/>
                </div>
            </div>
        </div>
    )

}

export default Main;