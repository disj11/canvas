import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {TextAlign} from 'models/tools/Text';

interface Props {
    textAlign: string,
    onChange: (textAlign: string) => void,
}

const AlignButton = ({textAlign, onChange}: Props) => {
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (onChange) {
            onChange(newAlignment);
        }
    };

    return (
        <ToggleButtonGroup
            value={textAlign}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            fullWidth
        >
            <ToggleButton value={TextAlign.LEFT} aria-label="left aligned">
                <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value={TextAlign.CENTER} aria-label="centered">
                <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value={TextAlign.RIGHT} aria-label="right aligned">
                <FormatAlignRightIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default AlignButton;