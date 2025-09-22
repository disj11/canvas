import {Typography, Box} from "@mui/material";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";

const PropBoxLayout: React.FC = observer(({ children }) => {
    const { canvasStore, objectStore } = useStores();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    marginBottom: 3,
                }}
            >
                <Typography variant={"h6"} color={"primary"}>
                    {objectStore.activeObject ? objectStore.getObjectTypeName() : canvasStore.canvasMode.display}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Box>
    )
})

export default PropBoxLayout;