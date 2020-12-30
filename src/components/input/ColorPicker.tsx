import { Popover, Typography } from "@material-ui/core";
import React from "react";
import { ChromePicker, ColorResult } from "react-color"
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Props {
    label?: string,
    color: string,
    disableAlpha?: boolean,
    onChange: (color: ColorResult) => void;
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

const ColorPicker = (props: Props) => {
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
            {props.label && <Typography variant={"caption"}>{props.label}</Typography>}
            <div>
                <div className={classes.colorBox} onClick={handleClick} />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <ChromePicker color={props.color} disableAlpha={props.disableAlpha} onChangeComplete={props.onChange} />
                </Popover>
            </div>
        </div>
    )
}

export default ColorPicker;