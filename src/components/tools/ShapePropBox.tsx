import { Box, Typography } from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { observer } from "mobx-react";
import { ShapeType } from "../../models/tools/Shape";
import clsx from "clsx";
import { CommonColor } from "../../models/color/CommonColor";
import PropBoxLayout from "./PropBoxLayout";

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: "4px",
        cursor: "pointer",
        padding: theme.spacing(1),
        marginRight: theme.spacing(0.5),
        height: 40,
        "&:hover": {
            background: CommonColor.BACKGROUND_GRADIENT_HOVER,
            "& svg > *": {
                stroke: "white",
            }
        },
    },
    selected: {
        background: CommonColor.BACKGROUND_GRADIENT,
        "& svg > *": {
            stroke: "white",
        }
    }
}))

const ShapePropBox = observer(() => {
    const classes = useStyles();

    return (
        <PropBoxLayout>
            <div>
                <Box mb={1}>
                    <Typography variant={"caption"}>모양</Typography>
                </Box>
                <Box display={"flex"}>
                    <div
                        className={clsx(classes.button)}
                        onClick={() => console.log(ShapeType.ELLIPSE)}
                    >
                        <svg height="24" width="24">
                            <circle cx="12" cy="12" r="10" stroke="black" fill="transparent" strokeWidth={2} />
                        </svg>
                    </div>
                    <div
                        className={clsx(classes.button)}
                        onClick={() => console.log(ShapeType.RECT)}
                    >
                        <svg width="24" height="24">
                            <rect width="24" height="24" stroke="black" fill="transparent" strokeWidth={4} />
                        </svg>
                    </div>
                    <div
                        className={clsx(classes.button)}
                        onClick={() => console.log(ShapeType.TRIANGLE)}
                    >
                        <svg width="24" height="24">
                            <polygon points="12,2 22,22 2,22" stroke="black" fill="transparent" strokeWidth={2} />
                        </svg>
                    </div>
                </Box>
            </div>
        </PropBoxLayout>
    )
})

export default ShapePropBox;