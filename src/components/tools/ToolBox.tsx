import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import ToolButton from "./ToolButton";
import MouseIcon from '@material-ui/icons/Mouse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BrushIcon from "@material-ui/icons/Brush";
import {ToolTypes} from "../../models/tools/ToolTypes";
import MenuToolButton from "./MenuToolButton";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";

const useStyles = makeStyles(() => ({
    appBarColor: {
        backgroundColor: "rgba(30,30,30,0.95)",
    },
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
        <AppBar
            classes={{
                colorDefault: classes.appBarColor,
            }}
            color={"default"}
            elevation={0}
        >
            <Toolbar variant={"dense"}>
                <div className={classes.left}>
                    <MenuToolButton/>
                </div>
                <div className={classes.center}>
                    <ToolButton
                        icon={<MouseIcon/>}
                        text={"선택"}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.SELECT)}
                        selected={canvasStore.canvasMode === ToolTypes.SELECT}
                    />
                    <ToolButton
                        icon={<BrushIcon/>}
                        text={"브러시"}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.BRUSH)}
                        selected={canvasStore.canvasMode === ToolTypes.BRUSH}
                    />
                    <ToolButton
                        icon={<DashboardIcon/>}
                        text={"셰이프"}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.SHAPE)}
                        selected={canvasStore.canvasMode === ToolTypes.SHAPE}
                    />
                    <ToolButton
                        icon={<TextFieldsIcon/>}
                        text={"텍스트"}
                        onClick={() => canvasStore.setCanvasMode(ToolTypes.TEXT)}
                        selected={canvasStore.canvasMode === ToolTypes.TEXT}
                    />
                    <ToolButton
                        icon={<PhotoSizeSelectSmallIcon/>}
                        text={"캔버스"}
                        onClick={() => canvasStore.canvasMode = ToolTypes.CANVAS}
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