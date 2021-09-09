import React from "react";
import {Box, BoxProps, Typography} from "@material-ui/core";

interface Props extends BoxProps {
    label?: string,
}

const PropBoxItem: React.FC<Props> = ({label, children, ...other}) => {
    return (
        <Box {...other}>
            {label && (
                <Box mb={1}>
                    <Typography variant={"caption"}>{label}</Typography>
                </Box>
            )}
            {children}
        </Box>
    )
}

export default PropBoxItem;