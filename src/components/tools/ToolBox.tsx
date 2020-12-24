import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import ToolButton from "./ToolButton";
import MouseIcon from '@material-ui/icons/Mouse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BrushIcon from "@material-ui/icons/Brush";
import {ToolTypes} from "../../models/canvas/ToolTypes";

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
                </div>
                <div className={classes.center}>
                    <ToolButton
                        icon={<MouseIcon/>}
                        text={"선택"}
                        onClick={() => canvasStore.selectedTool = ToolTypes.SELECT}
                        selected={canvasStore.selectedTool === ToolTypes.SELECT}
                    />
                    <ToolButton
                        icon={<BrushIcon/>}
                        text={"브러쉬"}
                        onClick={() => canvasStore.selectedTool = ToolTypes.BRUSH}
                        selected={canvasStore.selectedTool === ToolTypes.BRUSH}
                    />
                    <ToolButton
                        icon={<DashboardIcon/>}
                        text={"셰이프"}
                        onClick={() => canvasStore.selectedTool = ToolTypes.SHAPE}
                        selected={canvasStore.selectedTool === ToolTypes.SHAPE}
                    />
                </div>
                <div className={classes.right}>
                </div>
            </Toolbar>
        </AppBar>
    )
})

export default ToolBox;