import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CommonColor } from "models/color/CommonColor";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    button: {
        borderRadius: 0,
        border: 2,
        borderStyle: "solid",
        borderColor: "#ddd",
    },
    selected: {
        background: CommonColor.BACKGROUND_GRADIENT,
        color: "#ffffff",
    }
}));


interface Props {
    bold: boolean,
    toggle: (bold: boolean) => void,
}

const BoldButton = ({bold, toggle}: Props) => {
    const classes = useStyles();
    return (
        <Button className={clsx(classes.button, bold && classes.selected)} onClick={() => toggle(!bold)}>
            <FontAwesomeIcon icon={faBold} size="lg" />
        </Button>
    )
}

export default BoldButton;