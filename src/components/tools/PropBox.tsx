import React from "react";
import { observer } from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useStores } from "../../hooks/useStores";
import { ToolTypes } from "../../models/tools/ToolTypes";
import BrushPropBox from "./BrushPropBox";
import ShapePropBox from "./ShapePropBox";
import TextPropBox from "./TextPropBox";
import CanvasPropBox from "./CanvasPropBox";
import SelectPropBox from "./SelectPropBox";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        height: "100%",
    }
}));

const PropBox = observer(() => {
    const classes = useStyles();
    const { canvasStore, objectManagerStore } = useStores();
    const selectedTool = canvasStore.canvasMode;
    const activeObject = objectManagerStore.activeObject;

    return (
        <React.Fragment>
            <div className={classes.root}>
                {!activeObject && <React.Fragment>
                    {selectedTool === ToolTypes.SELECT && (<SelectPropBox />)}
                    {selectedTool === ToolTypes.BRUSH && (<BrushPropBox />)}
                    {selectedTool === ToolTypes.SHAPE && (<ShapePropBox />)}
                    {selectedTool === ToolTypes.TEXT && (<TextPropBox />)}
                    {selectedTool === ToolTypes.CANVAS && (<CanvasPropBox />)}
                </React.Fragment>}
                {activeObject && <React.Fragment>
                    {objectManagerStore.isPath() && <BrushPropBox />}
                    {objectManagerStore.isShape() && <ShapePropBox />}
                    {objectManagerStore.isText() && <TextPropBox />}
                </React.Fragment>}
            </div>
        </React.Fragment>
    )
})

export default PropBox;