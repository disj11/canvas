import {Box, Button, Typography} from "@material-ui/core";
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
        marginRight: theme.spacing(0.5),
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
                    <Button
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.ELLIPSE && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.ELLIPSE)}
                    >
                        <svg height="40" width="40">
                            <circle cx="20" cy="20" r="18" stroke="black" fill="transparent" strokeWidth={3}/>
                        </svg>
                    </Button>
                    <Button
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.RECT && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.RECT)}
                    >
                        <svg width="40" height="40">
                            <rect width="40" height="40" stroke="black" fill="transparent" strokeWidth={5}/>
                        </svg>
                    </Button>
                    <Button
                        className={clsx(classes.button, canvasStore.shapeType === ShapeType.TRIANGLE && classes.selected)}
                        onClick={() => handleShapeChange(ShapeType.TRIANGLE)}
                    >
                        <svg width="40" height="40">
                            <polygon points="20,2 38,38 2,38" stroke="black" fill="transparent" strokeWidth={3}/>
                        </svg>
                    </Button>
                </Box>
            </div>
        </div>
    )
})

export default ShapePropBox;