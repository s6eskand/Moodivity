import React, { useState } from 'react';

// custom components
import SideNav from "./SideNav";
import DashboardContent from "./DashboardContent";

// constants
import { TABS } from "./tabs";

function Dashboard(props) {
    const [state, setState] = useState({
        openDrawer: true,
        value: 0
    });

    const handleTabChange = (e, newValue) => {
        if (newValue === 3) {
            console.log(true)
        } else {
            setState({
                ...state,
                value: newValue
            })
        }
    };

    return(
        <div>
            <SideNav
                open={state.openDrawer}
                value={state.value}
                handleTabChange={handleTabChange}
            />
            {TABS.map((tab, index) => (
                <DashboardContent
                    index={index}
                    value={state.value}
                    component={tab.component}
                    title={tab.title}
                />
            ))}
        </div>
    )
}

export default Dashboard;