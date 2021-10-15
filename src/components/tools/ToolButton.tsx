import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    button: {
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    caption: {
        marginTop: theme.spacing(0.5),
        fontSize: "0.70rem",
    },
    selected: {
        backgroundColor: theme.palette.secondary.main,
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