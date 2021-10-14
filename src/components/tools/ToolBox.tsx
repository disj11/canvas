import React from "react";
import {AppBar, Toolbar} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import ToolButton from "./ToolButton";
import MouseIcon from '@mui/icons-material/Mouse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BrushIcon from "@mui/icons-material/Brush";
import {ToolTypes} from "../../models/tools/ToolTypes";
import MenuToolButton from "./MenuToolButton";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import ImageIcon from "@mui/icons-material/Image";

const useStyles = makeStyles(() => ({
    left: {
        justifyContent: "flex-start",
    },
    center: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
    right: {
        justifyContent: "flex-end",
    }
}));

const ToolBox = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();

    return (
        <AppBar>
            <Toolbar variant={"dense"}>
                <div className={classes.left}>
                    <MenuToolButton/>
                </div>
                <div className={classes.center}>
                    <ToolButton
                        icon={<MouseIcon/>}
                        text={ToolTypes.SELECT.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.SELECT)}
                        selected={canvasStore.canvasMode === ToolTypes.SELECT}
                    />
                    <ToolButton
                        icon={<BrushIcon/>}
                        text={ToolTypes.BRUSH.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.BRUSH)}
                        selected={canvasStore.canvasMode === ToolTypes.BRUSH}
                    />
                    <ToolButton
                        icon={<DashboardIcon/>}
                        text={ToolTypes.SHAPE.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.SHAPE)}
                        selected={canvasStore.canvasMode === ToolTypes.SHAPE}
                    />
                    <ToolButton
                        icon={<TextFieldsIcon/>}
                        text={ToolTypes.TEXT.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.TEXT)}
                        selected={canvasStore.canvasMode === ToolTypes.TEXT}
                    />
                    <ToolButton
                        icon={<ImageIcon/>}
                        text={ToolTypes.IMAGE.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.IMAGE)}
                        selected={canvasStore.canvasMode === ToolTypes.IMAGE}
                    />
                    <ToolButton
                        icon={<PhotoSizeSelectSmallIcon/>}
                        text={ToolTypes.CANVAS.display}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.CANVAS)}
                        selected={canvasStore.canvasMode === ToolTypes.CANVAS}
                    />
                </div>
                <div className={classes.right}>
                </div>
            </Toolbar>
        </AppBar>
    )
})

export default ToolBox;