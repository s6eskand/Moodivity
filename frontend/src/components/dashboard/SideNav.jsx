import React from 'react';

// images
import logo from '../../media/images/moodivity_logo.png';

// material components
import {
    Tabs,
    Tab,
    Drawer,
    makeStyles,
} from "@material-ui/core";

// material icons
import {
    AccountCircle,
    Book,
    Assessment,
    ExitToApp,
} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        width: 240
    }
});

function SideNav(props) {
    const classes = useStyles();

    return (
        <Drawer
            variant="persistent"
            open={props.open}
            BackdropProps={{
                invisible: true
            }}
        >
            <img width={200} style={{padding: '20px'}} src={logo} alt=""/>
            <Tabs
                className={classes.root}
                onChange={props.handleTabChange}
                value={props.value}
                orientation="vertical"
                variant="scrollable"
            >
                <Tab className={classes.root} icon={<AccountCircle/>} label="Profile"/>
                <Tab className={classes.root} icon={<Book/>} label="View Logs"/>
                <Tab className={classes.root} icon={<Assessment/>} label="Start Work"/>
                <Tab className={classes.root} icon={<ExitToApp style={{transform: 'rotate(-180deg)'}} />} label="Logout" />
            </Tabs>
        </Drawer>
    )
}

export default SideNav;