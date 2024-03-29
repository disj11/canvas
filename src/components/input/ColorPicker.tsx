import {Popover, Typography} from "@mui/material";
import React from "react";
import {ChromePicker, ColorResult} from "react-color"
import makeStyles from '@mui/styles/makeStyles';

interface Props {
    label?: string,
    color: string | undefined,
    disableAlpha?: boolean,
    disabled?: boolean,
    onChange: (color: ColorResult) => void;
}

const useStyles = makeStyles(() => ({
    colorBox: {
        width: "100%",
        height: 35,
        border: 1,
        borderStyle: "solid",
        borderColor: "#c0c0c0",
        backgroundColor: (props: Props) => props.color,
        cursor: (props: Props) => !props.disabled ? "pointer" : "default",
    }
}));

const ColorPicker = (props: Props) => {
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const open = !!anchorEl;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {props.label && <Typography variant={"caption"}>{props.label}</Typography>}
            <div>
                <div className={classes.colorBox} onClick={handleClick}/>
                <Popover
                    open={open && !props.disabled}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <ChromePicker color={props.color} disableAlpha={props.disableAlpha}
                                  onChangeComplete={props.onChange}/>
                </Popover>
            </div>
        </div>
    )
}

export default ColorPicker;