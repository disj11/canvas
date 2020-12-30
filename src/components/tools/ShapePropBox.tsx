import {Box, Typography} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {ShapeType} from "../../models/canvas/Shape";
import {useStores} from "../../hooks/useStores";
import clsx from "clsx";
import {CommonColor} from "../../models/color/CommonColor";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3),
    },
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
    const {canvasStore} = useStores();

    const handleShapeChange = (type: ShapeType) => {
        canvasStore.shapeType = type || ShapeType.ELLIPSE;
    }

    return (
        <div>
            <div className={classes.title}>
                <Typography variant={"h6"} color={"primary"}>셰이프</Typography>
            </div>
            <div>
                <Box mb={1}>
                    <Typography variant={"caption"}>모양</Typography>
                </Box>
                <Box display={"flex"}>
                    <div
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.ELLIPSE && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.ELLIPSE)}
                    >
                        <svg height="24" width="24">
                            <circle cx="12" cy="12" r="10" stroke="black" fill="transparent" strokeWidth={2}/>
                        </svg>
                    </div>
                    <div
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.RECT && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.RECT)}
                    >
                        <svg width="24" height="24">
                            <rect width="24" height="24" stroke="black" fill="transparent" strokeWidth={4}/>
                        </svg>
                    </div>
                    <div
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.TRIANGLE && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.TRIANGLE)}
                    >
                        <svg width="24" height="24">
                            <polygon points="12,2 22,22 2,22" stroke="black" fill="transparent" strokeWidth={2}/>
                        </svg>
                    </div>
                </Box>
            </div>
        </div>
    )
})

export default ShapePropBox;