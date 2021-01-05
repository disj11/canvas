import React from "react";
import { observer } from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useStores } from "../../hooks/useStores";
import { ToolTypes } from "../../models/tools/ToolTypes";
import BrushPropBox from "./BrushPropBox";
import ShapePropBox from "./ShapePropBox";
import { ShapeType } from "models/tools/Shape";

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
                    {selectedTool === ToolTypes.BRUSH && (<BrushPropBox />)}
                    {selectedTool === ToolTypes.SHAPE && (<ShapePropBox />)}
                </React.Fragment>}
                {activeObject && <React.Fragment>
                    {activeObject.isType("path") && <BrushPropBox />}
                    {(
                        activeObject.isType(ShapeType.RECT.value) ||
                        activeObject.isType(ShapeType.TRIANGLE.value) ||
                        activeObject.isType(ShapeType.ELLIPSE.value)
                    ) && <ShapePropBox />}
                </React.Fragment>}
            </div>
        </React.Fragment>
    )
})

export default PropBox;