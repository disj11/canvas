import React from "react";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        color: "#fff",
        padding: theme.spacing(0.5),
    }
}));

const ToolButton = ({icon, text, onClick}: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.button} onClick={onClick}>
            {icon}
            <Typography variant={"caption"}>{text}</Typography>
        </div>
    )
}

interface Props {
    icon: any;
    text: string;
    onClick: (e: React.MouseEvent) => void;
}

export default ToolButton;