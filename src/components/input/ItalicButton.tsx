import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
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
    italic: boolean,
    toggle: (bold: boolean) => void,
}

const ItalicButton = ({italic, toggle}: Props) => {
    const classes = useStyles();
    return (
        <Button className={clsx(classes.button, italic && classes.selected)} onClick={() => toggle(!italic)}>
            <FontAwesomeIcon icon={faItalic} size="lg" />
        </Button>
    )
}

export default ItalicButton;