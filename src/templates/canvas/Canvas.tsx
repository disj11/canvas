import React from "react";
import {Layout} from "../layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FabricContext} from "../../contexts/FabricContext";
import {ToolBox} from "../../components/tools";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";

const leftMenuWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100vw",
        height: "100vh",
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
    canvas: {
        backgroundColor: "#fff",
    }
}))

const Canvas = observer(() => {
    const classes = useStyles();
    const canvasEl = React.useRef<HTMLCanvasElement>(null);
    const {canvas, initCanvas} = React.useContext(FabricContext);
    const {canvasStore} = useStores();

    React.useLayoutEffect(() => {
        if (!!canvasEl.current) {
            initCanvas(canvasEl.current, {
                width: canvasStore.canvasWidth,
                height: canvasStore.canvasHeight,
            })
        }
        // eslint-disable-next-line
    }, [canvasEl]);

    return (
        <Layout>
            <ToolBox/>
            <div className={classes.root}>
                <div className={classes.left}>
                </div>
                <div className={classes.canvasWrapper}>
                    <canvas className={classes.canvas} ref={canvasEl}/>
                </div>
            </div>
        </Layout>
    )
})

export default Canvas;