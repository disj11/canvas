import { makeStyles } from "@material-ui/core";
import React from "react";
import { TwitterPicker } from "react-color"

interface Props {
    color: string,
    onChange: (color: string) => void;
}

const useStyles = makeStyles((theme) => ({
    colorBox: {
        width: "100%",
        height: 35,
        border: 1,
        borderStyle: "solid",
        borderColor: "#c0c0c0",
        marginBottom: theme.spacing(2),
        backgroundColor: (props: Props) => props.color,
    }
}));

const ColorSelect = (props: Props) => {
    const classes = useStyles(props);
    return (
        <div>
            <div className={classes.colorBox}/>
            <TwitterPicker color={props.color} onChangeComplete={(e) => props.onChange(e.hex)}/>
        </div>
    )
}

export default ColorSelect;