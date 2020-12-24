import React from "react";
import {Layout} from "../layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ToolBox} from "../../components/tools";
import {observer} from "mobx-react";
import {Button, Toolbar} from "@material-ui/core";
import {useStores} from "../../hooks/useStores";
import {fabric} from "fabric";

const leftMenuWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
    },
    flexBox: {
        display: "flex",
        flex: 1,
    },
    contents: {
        display: "flex",
    },
    left: {
        flexBasis: `${leftMenuWidth}px`,
        backgroundColor: "#f0f0f0",
    },
    canvasWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#c0c0c0",
        padding: theme.spacing(3),
    },
}))

const Canvas = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();
    const {canvas} = canvasStore;

    React.useEffect(() => {
        const el = document.getElementById(canvasStore.canvasId) as HTMLCanvasElement;
        canvasStore.initCanvas(el, {
            width: canvasStore.width,
            height: canvasStore.height,
            backgroundColor: canvasStore.backgroundColor,
        });
    }, []);

    const addRect = () => {
        canvas.add(new fabric.Rect({
            width: 100,
            height: 100,
        }))
    }

    return (
        <Layout>
            <ToolBox/>
            <div className={classes.root}>
                <Toolbar variant={"dense"}/>
                <div className={classes.flexBox}>
                    <div className={classes.left}>
                        <Button onClick={addRect}>ADD</Button>
                    </div>
                    <div className={classes.canvasWrapper}>
                        <canvas id={canvasStore.canvasId}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
})

export default Canvas;