import React from "react";
import {observer} from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useStores} from "../../hooks/useStores";
import {ToolTypes} from "../../models/canvas/ToolTypes";
import {Typography} from "@material-ui/core";
import BrushPropBox from "./BrushPropBox";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    }
}));

const PropBox = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();
    const selectedTool = canvasStore.selectedTool;

    return (
        <div className={classes.root}>
            {selectedTool === ToolTypes.BRUSH && <BrushPropBox canvasStore={canvasStore}/>}
            {selectedTool === ToolTypes.SHAPE && (<div>
                <Typography variant={"subtitle1"}>셰이프</Typography>
            </div>)}
        </div>
    )
})

export default PropBox;