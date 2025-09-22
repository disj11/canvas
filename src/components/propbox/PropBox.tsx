import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import {ToolTypes} from "../../models/tools/ToolTypes";
import BrushPropBox from "./BrushPropBox";
import ShapePropBox from "./ShapePropBox";
import TextPropBox from "./TextPropBox";
import CanvasPropBox from "./CanvasPropBox";
import SelectPropBox from "./SelectPropBox";
import ImagePropBox from "./ImagePropBox";
import {Box} from "@mui/material";

const PropBox = observer(() => {
    const {canvasStore, objectStore} = useStores();
    const selectedTool = canvasStore.canvasMode;
    const activeObject = objectStore.activeObject;

    return (
        <React.Fragment>
            <Box
                sx={{
                    padding: 3,
                    height: "100%",
                }}
            >
                {!activeObject && <React.Fragment>
                    {selectedTool === ToolTypes.SELECT && (<SelectPropBox/>)}
                    {selectedTool === ToolTypes.BRUSH && (<BrushPropBox/>)}
                    {selectedTool === ToolTypes.SHAPE && (<ShapePropBox/>)}
                    {selectedTool === ToolTypes.TEXT && (<TextPropBox/>)}
                    {selectedTool === ToolTypes.IMAGE && (<ImagePropBox/>)}
                    {selectedTool === ToolTypes.CANVAS && (<CanvasPropBox/>)}
                </React.Fragment>}
                {activeObject && <React.Fragment>
                    {objectStore.isPath() && <BrushPropBox/>}
                    {objectStore.isShape() && <ShapePropBox/>}
                    {objectStore.isText() && <TextPropBox/>}
                    {objectStore.isImage() && <ImagePropBox/>}
                </React.Fragment>}
            </Box>
        </React.Fragment>
    )
})

export default PropBox;