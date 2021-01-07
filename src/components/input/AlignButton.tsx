import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    alignBox: {
        display: "flex",
    },
    alignButton: {
        flex: 1,
    }
}));

interface Props {
    onLeft?: () => void,
    onCenter?: () => void,
    onRight?: () => void,
}

const AlignButton = ({onLeft, onCenter, onRight}: Props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.alignBox}>
            <Button className={classes.alignButton} onClick={onLeft}>
                <FormatAlignLeftIcon/>
            </Button>
            <Button className={classes.alignButton} onClick={onCenter}>
                <FormatAlignCenterIcon/>
            </Button>
            <Button className={classes.alignButton} onClick={onRight}>
                <FormatAlignRightIcon/>
            </Button>
        </div>
    )
}

export default AlignButton;