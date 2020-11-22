// components
import Profile from "./profile/Profile";
import Productivity from "./productivity/Productivity";

export const TABS = [
    {
        title: "Profile",
        component: <Profile/>
    },
    {
        title: 'Time to get productive!',
        component: <Productivity/>
    }
];