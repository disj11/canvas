import {Popover} from "@material-ui/core";
import React from "react";
import {TwitterPicker, ChromePicker} from "react-color"
import makeStyles from "@material-ui/core/styles/makeStyles";

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
        cursor: "pointer",
    }
}));

const ColorSelect = (props: Props) => {
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = !!anchorEl;

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.colorBox} onClick={handleClick}/>
            <TwitterPicker color={props.color} onChangeComplete={(e) => props.onChange(e.hex)}/>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <ChromePicker color={props.color} disableAlpha={true} onChangeComplete={(e) => props.onChange(e.hex)}/>
            </Popover>
        </div>
    )
}

export default ColorSelect;