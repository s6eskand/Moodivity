// components
import Profile from "./profile/Profile";
import Productivity from "./productivity/Productivity";
import Log from "./logs/Log";

export const TABS = [
    {
        title: "Profile",
        component: <Profile/>
    },
    {
        title: "Productivity Logs",
        component: <Log />
    },
    {
        title: 'Time to get productive!',
        component: <Productivity/>
    }
];