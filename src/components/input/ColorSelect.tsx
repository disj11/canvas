import {Select, SelectChangeEvent} from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { Box } from "@mui/material";
import usePrevious from "hooks/usePrevious";
import React from "react"
import { ColorResult } from "react-color"
import ColorPicker from "./ColorPicker"
import {useTheme} from "@mui/styles";

interface Props {
    color: string | undefined;
    onChange: (color: string | undefined) => void;
}

const ColorSelect = ({ color, onChange }: Props) => {
    const previousColor = usePrevious(color);
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = React.useState<string>(!color ? "none" : "solid");

    const handleColorChange = (color: ColorResult) => {
        const rgb = !color.rgb.a && color.rgb.a !== 0 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        onChange(rgb);
    }

    const handleSelectedValueChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedValue(value);

        if (value === "none") {
            onChange(undefined);
        } else {
            onChange(previousColor || theme.palette.primary.main);
        }
    };

    return (
        <Box display={"flex"}>
            <Box mr={1.5} flexBasis={35}>
                <ColorPicker color={color} onChange={handleColorChange} disabled={selectedValue === "none"} />
            </Box>
            <Box flex={1}>
                <FormControl variant={"standard"} fullWidth>
                    <Select
                        value={selectedValue}
                        onChange={handleSelectedValueChange}
                    >
                        <MenuItem value="none">
                            <em>없음</em>
                        </MenuItem>
                        <MenuItem value={"solid"}>단색</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default ColorSelect