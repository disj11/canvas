import React from "react";
import {Layout} from "../layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FabricContext} from "../../context/FabricContext";
import {AppBar, Toolbar} from "@material-ui/core";

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

const defaultCanvasSize = {width: 500, height: 500};

const Canvas = () => {
    const classes = useStyles();
    const canvasEl = React.useRef<HTMLCanvasElement>(null);
    const {canvas, initCanvas} = React.useContext(FabricContext);

    React.useLayoutEffect(() => {
        if (!!canvasEl.current) {
            initCanvas(canvasEl.current, {...defaultCanvasSize})
        }
        // eslint-disable-next-line
    }, [canvasEl]);

    return (
        <Layout>
            <AppBar>
                <Toolbar>
                    도구 영역
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <div className={classes.left}></div>
                <div className={classes.canvasWrapper}>
                    <canvas className={classes.canvas} ref={canvasEl}/>
                </div>
            </div>
        </Layout>
    )
}

export default Canvas;