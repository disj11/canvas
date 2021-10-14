import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { TextAlign } from 'models/tools/Text';
import { CommonColor } from 'models/color/CommonColor';

const useStyles = makeStyles(() => ({
    alignBox: {
        display: "flex",
        border: 2,
        borderStyle: "solid",
        borderColor: "#ddd",
    },
    alignButton: {
        flex: 1,
        borderRadius: 0,
    },
    selected: {
        background: CommonColor.BACKGROUND_GRADIENT,
        color: "#ffffff",
    }
}));

interface Props {
    textAlign: string,
    onChange: (textAlign: string) => void,
}

const AlignButton = ({textAlign, onChange}: Props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.alignBox}>
            <Button className={clsx(classes.alignButton, textAlign === TextAlign.LEFT && classes.selected)} onClick={() => onChange(TextAlign.LEFT)}>
                <FormatAlignLeftIcon/>
            </Button>
            <Button className={clsx(classes.alignButton, textAlign === TextAlign.CENTER && classes.selected)} onClick={() => onChange(TextAlign.CENTER)}>
                <FormatAlignCenterIcon/>
            </Button>
            <Button className={clsx(classes.alignButton, textAlign === TextAlign.RIGHT && classes.selected)} onClick={() => onChange(TextAlign.RIGHT)}>
                <FormatAlignRightIcon/>
            </Button>
        </div>
    )
}

export default AlignButton;