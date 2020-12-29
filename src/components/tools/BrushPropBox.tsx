import {Box, Button, Select, Typography} from "@material-ui/core";
import {BrushType} from "../../models/canvas/Brush";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSprayCan, faCircle } from "@fortawesome/free-solid-svg-icons";
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
        "&:hover": {
            background: CommonColor.BACKGROUND_GRADIENT_HOVER,
            "& *": {
                color: "white",
            }
        },
    },
    selected: {
        background: CommonColor.BACKGROUND_GRADIENT,
        "& *": {
            color: "white",
        }
    }
}))

const BrushPropBox = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();

    const handleBrushChange = (type: BrushType) => {
        canvasStore.brushType = type || BrushType.PENCIL;
    }

    return (
        <div>
            <div className={classes.title}>
                <Typography variant={"h6"} color={"primary"}>브러시</Typography>
            </div>
            <div>
                <Box mb={1}>
                    <Typography variant={"caption"}>모양</Typography>
                </Box>
                <Box display="flex">
                    <div
                        className={clsx(classes.button, canvasStore.brushType === BrushType.PENCIL && classes.selected)}
                        onClick={() => handleBrushChange(BrushType.PENCIL)}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                    </div>
                    <div
                        className={clsx(classes.button, canvasStore.brushType === BrushType.SPRAY && classes.selected)}
                        onClick={() => handleBrushChange(BrushType.SPRAY)}
                    >
                        <FontAwesomeIcon icon={faSprayCan} size="lg"/>
                    </div>
                    <div
                        className={clsx(classes.button, canvasStore.brushType === BrushType.CIRCLE && classes.selected)}
                        onClick={() => handleBrushChange(BrushType.CIRCLE)}
                    >
                        <FontAwesomeIcon icon={faCircle} size="lg"/>
                    </div>
                </Box>
            </div>
        </div>
    )
})

export default BrushPropBox;