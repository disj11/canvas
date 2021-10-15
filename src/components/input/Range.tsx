import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Slider } from "@mui/material";
import { Input } from "@mui/material";
import { Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";

interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
    prefix?: string;
    min?: number;
    max?: number;
}

const useStyles = makeStyles(() => ({
    label: {
        display: "flex",
        justifyContent: "space-between",
    }
}));

const Range = ({ label, value, onChange, prefix, min, max }: Props) => {
    const classes = useStyles();

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            onChange(newValue);
        }
    };

    return (
        <div>
            <div className={classes.label}>
                <Typography variant={"caption"}>{label}</Typography>
                <Input
                    value={value}
                    margin="dense"
                    inputProps={{
                        min: 1,
                        max: 100,
                        type: 'number',
                    }}
                    endAdornment={<InputAdornment position="end">{prefix}</InputAdornment>}
                />
            </div>
            <div>
                <Slider
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    )
}

export default Range;