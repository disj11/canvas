import React from "react";
import BrushToolButton from "./BrushToolButton";
import {AppBar, Toolbar} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    appBarColor: {
        backgroundColor: "#000010",
    },
    left: {
        justifyContent: "flex-start",
    },
    center: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
    right: {
        justifyContent: "flex-end",
    }
}));

const ToolBox = () => {
    const classes = useStyles();
    return (
        <AppBar
            classes={{
                colorDefault: classes.appBarColor,
            }}
            color={"default"}
            elevation={0}
        >
            <Toolbar variant={"dense"}>
                <div className={classes.left}>
                    <BrushToolButton/>
                </div>
                <div className={classes.center}>
                    <BrushToolButton/>
                </div>
                <div className={classes.right}>
                    <BrushToolButton/>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default ToolBox;