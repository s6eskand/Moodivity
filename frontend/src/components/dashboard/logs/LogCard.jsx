import React, { useState } from 'react';

// material components
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    makeStyles,
} from "@material-ui/core";

// material icons
import {
    ExpandMore,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        maxWidth: 345,
    }
}));

function LogCard(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return(
        <Card className={classes.root}>
            <CardHeader
                title={props.status}
                subheader={props.date}
            />
            <CardContent>
                <p>{props.analytics}</p>
            </CardContent>
            <CardActions>
                <IconButton
                    style={{width: 'auto'}}
                    onClick={() => setOpen(!open)}
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={open}>
                <CardContent>
                    <p>{props.log}</p>
                </CardContent>
            </Collapse>
        </Card>
    )

}

export default LogCard;