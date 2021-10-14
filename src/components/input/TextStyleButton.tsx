import React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

interface Props {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    toggleBold: (bold: boolean) => void;
    toggleItalic: (italic: boolean) => void;
    toggleUnderline: (underline: boolean) => void;
}

enum TextStyle {
    BOLD = "BOLD",
    ITALIC = "ITALIC",
    UNDERLINED = "UNDERLINED",
}

const TextStyleButton = ({bold, italic, underline, toggleBold, toggleItalic, toggleUnderline}: Props) => {
    const formats = React.useMemo(() => {
        const formats = [];
        if (bold) formats.push(TextStyle.BOLD);
        if (italic) formats.push(TextStyle.ITALIC);
        if (underline) formats.push(TextStyle.UNDERLINED);
        return formats;
    }, [bold, italic, underline]);

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        toggleBold(newFormats.includes(TextStyle.BOLD));
        toggleItalic(newFormats.includes(TextStyle.ITALIC));
        toggleUnderline(newFormats.includes(TextStyle.UNDERLINED));
    };
    
    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
            fullWidth
        >
            <ToggleButton value={TextStyle.BOLD} aria-label="bold">
                <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value={TextStyle.ITALIC} aria-label="italic">
                <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value={TextStyle.UNDERLINED} aria-label="underlined">
                <FormatUnderlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default TextStyleButton;