import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
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
    underline: boolean,
    toggle: (bold: boolean) => void,
}

const UnderlineButton = ({underline, toggle}: Props) => {
    const classes = useStyles();
    return (
        <Button className={clsx(classes.button, underline && classes.selected)} onClick={() => toggle(!underline)}>
            <FontAwesomeIcon icon={faUnderline} size="lg" />
        </Button>
    )
}

export default UnderlineButton;