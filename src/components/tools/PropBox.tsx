import React from "react";
import { observer } from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useStores } from "../../hooks/useStores";
import { ToolTypes } from "../../models/canvas/ToolTypes";
import BrushPropBox from "./BrushPropBox";
import ShapePropBox from "./ShapePropBox";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        height: "100%",
    }
}));

const PropBox = observer(() => {
    const classes = useStyles();
    const { canvasStore } = useStores();
    const selectedTool = canvasStore.selectedTool;
    const activeObject = canvasStore.activeObject;
    const isSelected = Boolean(activeObject);

    return (
        <React.Fragment>
            {!isSelected && <div className={classes.root}>
                {selectedTool === ToolTypes.BRUSH && <BrushPropBox />}
                {selectedTool === ToolTypes.SHAPE && (<ShapePropBox />)}
            </div>}
        </React.Fragment>
    )
})

export default PropBox;