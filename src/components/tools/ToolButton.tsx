import React from "react";
import {Box} from "@mui/material";
import {Theme} from "@mui/material/styles";

const ToolButton = ({icon, text, onClick, selected}: Props) => {
    return (
        <Box
            sx={{
                minHeight: 48,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                paddingTop: 0.5,
                paddingBottom: 0.5,
                paddingRight: 3,
                paddingLeft: 3,
                "&:hover": {
                    backgroundColor: 'secondary.main',
                },
                ...(selected && {
                    backgroundColor: 'secondary.main',
                })
            }}
            onClick={onClick}
        >
            {icon}
            <Box
                sx={{
                    marginTop: 0.5,
                    fontSize: "0.70rem",
                }}
            >
                {text}
            </Box>
        </Box>
    )
}

interface Props {
    icon: any;
    text: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    selected?: boolean;
}

export default ToolButton;