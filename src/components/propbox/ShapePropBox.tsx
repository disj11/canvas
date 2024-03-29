import {Box} from "@mui/material";
import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {observer} from "mobx-react";
import {ShapeType} from "../../models/tools/Shape";
import clsx from "clsx";
import PropBoxLayout from "./PropBoxLayout";
import {useStores} from "hooks/useStores";
import {ColorSelect, Range} from "components/input";
import PropBoxItem from "./PropBoxItem";

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: "4px",
        cursor: "pointer",
        padding: theme.spacing(1),
        marginRight: theme.spacing(0.5),
        height: 40,
        "&:hover": {
            background: theme.palette.primary.main,
            "& svg > *": {
                stroke: theme.palette.background.default,
            },
        },
    },
    selected: {
        background: theme.palette.primary.main,
        "& svg > *": {
            stroke: theme.palette.background.default,
        },
    },
    propBox: {
        "& > div": {
            marginBottom: theme.spacing(3),
        }
    }
}))

const ShapePropBox = observer(() => {
    const classes = useStyles();
    const { shapeStore } = useStores();

    return (
        <PropBoxLayout>
            <div className={classes.propBox}>
                {!shapeStore.item && <div>
                    <PropBoxItem label={"모양"}>
                        <Box display={"flex"}>
                            <div
                                className={clsx(classes.button, shapeStore.shapeType === ShapeType.ELLIPSE && classes.selected)}
                                onClick={() => shapeStore.setShapeType(ShapeType.ELLIPSE)}
                            >
                                <svg height="24" width="24">
                                    <circle cx="12" cy="12" r="10" stroke="black" fill="transparent" strokeWidth={2} />
                                </svg>
                            </div>
                            <div
                                className={clsx(classes.button, shapeStore.shapeType === ShapeType.RECT && classes.selected)}
                                onClick={() => shapeStore.setShapeType(ShapeType.RECT)}
                            >
                                <svg width="24" height="24">
                                    <rect width="24" height="24" stroke="black" fill="transparent" strokeWidth={4} />
                                </svg>
                            </div>
                            <div
                                className={clsx(classes.button, shapeStore.shapeType === ShapeType.TRIANGLE && classes.selected)}
                                onClick={() => shapeStore.setShapeType(ShapeType.TRIANGLE)}
                            >
                                <svg width="24" height="24">
                                    <polygon points="12,2 22,22 2,22" stroke="black" fill="transparent" strokeWidth={2} />
                                </svg>
                            </div>
                        </Box>
                    </PropBoxItem>
                </div>}
                <PropBoxItem label={"채우기"}>
                    <ColorSelect color={shapeStore.fill} onChange={(color: string | undefined) => shapeStore.setFill(color)} />
                </PropBoxItem>
                <PropBoxItem label={"선 색상"}>
                    <ColorSelect color={shapeStore.stroke} onChange={(color: string | undefined) => shapeStore.setStroke(color)} />
                </PropBoxItem>
                <PropBoxItem>
                    <Range label="선 두께" value={shapeStore.strokeWidth} onChange={(strokeWidth) => shapeStore.setStrokeWidth(strokeWidth)} prefix={"px"} />
                </PropBoxItem>
            </div>
        </PropBoxLayout>
    )
})

export default ShapePropBox;