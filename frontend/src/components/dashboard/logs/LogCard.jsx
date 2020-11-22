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

    return(
        <Card className={classes.root}>
            <CardHeader
                title={
                    <p>
                    <span
                        style={{
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            borderRadius: '50%',
                            backgroundColor: `${props.color}`,
                            width: '50px'
                        }}
                    >{Math.round(props.score * 10) / 10}</span>
                    - {props.explanation}
                    </p>
                }
                subheader={props.date.split(' ')[0]}
            />
            <CardContent>
                <p>{props.log}</p>
            </CardContent>
        </Card>
    )

}

export default LogCard;