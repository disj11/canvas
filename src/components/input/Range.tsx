import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Slider } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";

interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
    prefix?: string;
}

const useStyles = makeStyles(theme => ({
    label: {
        display: "flex",
        justifyContent: "space-between",
    }
}));

const Range = ({ label, value, onChange, prefix }: Props) => {
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
                    value={value}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    )
}

export default Range;