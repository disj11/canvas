import React from "react";
import {Layout} from "../layout";
import makeStyles from '@mui/styles/makeStyles';
import {ToolBox} from "../../components/tools";
import {observer} from "mobx-react";
import {Toolbar} from "@mui/material";
import {useStores} from "../../hooks/useStores";
import {PropBox} from "../../components/propbox";

const leftMenuWidth = 260;
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
    const rootStore = useStores();
    const canvasRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        rootStore.init(canvasRef.current);
        rootStore.onInit();
        return () => rootStore.onDestroy();
    }, [rootStore, canvasRef]);

    return (
        <Layout>
            <ToolBox/>
            <div className={classes.root}>
                <Toolbar variant={"dense"}/>
                <div className={classes.flexBox}>
                    <div className={classes.left}>
                        <PropBox/>
                    </div>
                    <div className={classes.canvasWrapper} ref={canvasRef}/>
                </div>
            </div>
        </Layout>
    )
})

export default Canvas;