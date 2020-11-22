import React from 'react';

// styling
import './DashboardContent.css';

function DashboardContent(props) {

    return(
        <div hidden={props.value !== props.index} className="main">
            <h1 className="title">{props.title}</h1>
            <div className="main-content">
                {props.component}
            </div>
        </div>
    )

}

export default DashboardContent;