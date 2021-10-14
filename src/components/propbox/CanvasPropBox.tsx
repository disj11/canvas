import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import PropBoxLayout from "./PropBoxLayout";
import {Box, FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import React from "react";
import {ColorPalette} from "../input";
import PropBoxItem from "./PropBoxItem";

const CanvasPropBox = observer(() => {
    const {canvasStore} = useStores();
    const [width, setWidth] = React.useState(canvasStore.width);
    const [height, setHeight] = React.useState(canvasStore.height);

    return (
        <PropBoxLayout>
            <PropBoxItem label={"캔버스 크기 조정"} mb={3}>
                <Box display={"flex"}>
                    <Box flex={1} mr={1.5}>
                        <FormControl variant={"standard"} fullWidth>
                            <InputLabel htmlFor={"canvas-width"}>너비</InputLabel>
                            <Input
                                id={"canvas-width"}
                                type={"number"}
                                value={width}
                                onChange={(event) => setWidth(parseInt(event.target.value))}
                                onBlur={() => canvasStore.setWidth(width)}
                                endAdornment={<InputAdornment position="end">px</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box flex={1}>
                        <FormControl variant={"standard"} fullWidth>
                            <InputLabel htmlFor={"canvas-width"}>높이</InputLabel>
                            <Input
                                id={"canvas-width"}
                                type={"number"}
                                value={height}
                                onChange={(event) => setHeight(parseInt(event.target.value))}
                                onBlur={() => canvasStore.setHeight(height)}
                                endAdornment={<InputAdornment position="end">px</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </PropBoxItem>
            <PropBoxItem label={"배경"}>
                <ColorPalette
                    color={canvasStore.backgroundColor}
                    onChange={(event) => canvasStore.setBackgroundColor(event.hex)}
                    disableAlpha={true}
                />
            </PropBoxItem>
        </PropBoxLayout>
    )
})

export default CanvasPropBox;