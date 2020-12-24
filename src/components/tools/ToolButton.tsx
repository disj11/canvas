import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "inline-block",
        cursor: "pointer",
        color: "#fff",
        padding: theme.spacing(0.5),
    },
    caption: {
        fontSize: "0.70rem",
    }
}));

const ToolButton = ({icon, text, onClick}: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.button} onClick={onClick}>
            {icon}
            <div className={classes.caption}>{text}</div>
        </div>
    )
}

interface Props {
    icon: any;
    text: string;
    onClick: (e: React.MouseEvent) => void;
}

export default ToolButton;