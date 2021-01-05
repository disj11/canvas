import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Box } from "@material-ui/core";
import usePrevious from "hooks/usePrevious";
import { CommonColor } from "models/color/CommonColor";
import React from "react"
import { ColorResult } from "react-color"
import ColorPicker from "./ColorPicker"

interface Props {
    color: string;
    onChange: (color: string) => void;
}

const ColorSelect = ({ color, onChange }: Props) => {
    const previousColor = usePrevious(color);
    const [selectedValue, setSelectedValue] = React.useState<string>(color === "transparent" ? "none" : "solid");

    const handleColorChange = (color: ColorResult) => {
        const rgb = !color.rgb.a && color.rgb.a !== 0 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        onChange(rgb);
    }

    const handleSelectedValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setSelectedValue(value);

        if (value === "none") {
            onChange("transparent");
        } else {
            onChange(previousColor || CommonColor.PRIMARY);
        }
    };

    return (
        <Box display={"flex"}>
            <Box mr={1.5} flexBasis={35}>
                <ColorPicker color={color} onChange={handleColorChange} disabled={selectedValue === "none"} />
            </Box>
            <Box flex={1}>
                <FormControl fullWidth>
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