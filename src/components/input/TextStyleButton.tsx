import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BoldButton from './BoldButton';
import ItalicButton from './ItalicButton';
import UnderlineButton from './UnderlineButton';

const useStyles = makeStyles((theme) => ({
    alignBox: {
        display: "flex",
        "& > *": {
            flex: 1,
            marginRight: theme.spacing(1),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            "&:last-child": {
                marginRight: 0,
            }
        }
    },
}));

interface Props {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    toggleBold: (bold: boolean) => void;
    toggleItalic: (italic: boolean) => void;
    toggleUnderline: (underline: boolean) => void;
}

const TextStyleButton = ({bold, italic, underline, toggleBold, toggleItalic, toggleUnderline}: Props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.alignBox}>
            <BoldButton bold={bold} toggle={toggleBold}/>
            <ItalicButton italic={italic} toggle={toggleItalic}/>
            <UnderlineButton underline={underline} toggle={toggleUnderline}/>
        </div>
    )
}

export default TextStyleButton;