import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {CommonColor} from "../../models/color/CommonColor";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "inline-block",
        cursor: "pointer",
        color: "#fff",
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        textAlign: "center",
    },
    caption: {
        fontSize: "0.70rem",
    },
    selected: {
        background: CommonColor.BACKGROUND_GRADIENT,
    }
}));

const ToolButton = ({icon, text, onClick, selected}: Props) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.button, {
            [classes.selected]: selected,
        })} onClick={onClick}>
            {icon}
            <div className={classes.caption}>{text}</div>
        </div>
    )
}

interface Props {
    icon: any;
    text: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    selected?: boolean;
}

export default ToolButton;