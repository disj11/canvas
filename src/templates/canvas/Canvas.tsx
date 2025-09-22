import React from "react";
import {Layout} from "../layout";
import {ToolBox} from "../../components/tools";
import {observer} from "mobx-react";
import {Toolbar} from "@mui/material";
import {useStores} from "../../hooks/useStores";
import {PropBox} from "../../components/propbox";
import {Box} from "@mui/system";

const leftMenuWidth = 260;

const Canvas = observer(() => {
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <Toolbar variant={"dense"}/>
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            flexBasis: `${leftMenuWidth}px`,
                        }}
                    >
                        <PropBox/>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            backgroundColor: 'grey.400',
                            padding: 3,
                        }}
                        ref={canvasRef}
                    />
                </Box>
            </Box>
        </Layout>
    )
})

export default Canvas;