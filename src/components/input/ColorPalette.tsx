import { Box } from "@material-ui/core";
import React from "react";
import { ColorResult, TwitterPicker } from "react-color"
import ColorPicker from "./ColorPicker";

interface Props {
    color: string | undefined,
    disableAlpha?: boolean,
    onChange: (color: ColorResult) => void;
}

const ColorPalette = (props: Props) => {
    return (
        <div>
            <Box mb={2}>
                <ColorPicker {...props} />
            </Box>
            <TwitterPicker width={"100%"} color={props.color} onChangeComplete={props.onChange} />
        </div>
    )
}

export default ColorPalette;