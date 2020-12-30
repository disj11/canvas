import { Box, Divider, Typography } from "@material-ui/core";
import { BrushType } from "../../models/canvas/Brush";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/useStores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSprayCan, faCircle } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { CommonColor } from "../../models/color/CommonColor";
import { ColorSelect, Range } from "components/input";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
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
    },
    propBoxWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    propBox: {
        flex: 1,
        "& > div": {
            marginBottom: theme.spacing(3),
        }
    }
}))

const BrushPropBox = observer(() => {
    const classes = useStyles();
    const { brushStore } = useStores();

    const handleBrushChange = (value: BrushType) => {
        brushStore.setBrushType(value);
    }

    const handleLineWidthChange = (value: number) => {
        brushStore.setLineWidth(value);
    }

    const handleColorChange = (value: string) => {
        brushStore.setColor(value);
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant={"h6"} color={"primary"}>브러시</Typography>
            </div>
            <div className={classes.propBoxWrapper}>
                <div className={classes.propBox}>
                    <div>
                        <Box mb={1}>
                            <Typography variant={"caption"}>모양</Typography>
                        </Box>
                        <Box display="flex">
                            <div
                                className={clsx(classes.button, brushStore.brushType === BrushType.PENCIL && classes.selected)}
                                onClick={() => handleBrushChange(BrushType.PENCIL)}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                            </div>
                            <div
                                className={clsx(classes.button, brushStore.brushType === BrushType.SPRAY && classes.selected)}
                                onClick={() => handleBrushChange(BrushType.SPRAY)}
                            >
                                <FontAwesomeIcon icon={faSprayCan} size="lg" />
                            </div>
                            <div
                                className={clsx(classes.button, brushStore.brushType === BrushType.CIRCLE && classes.selected)}
                                onClick={() => handleBrushChange(BrushType.CIRCLE)}
                            >
                                <FontAwesomeIcon icon={faCircle} size="lg" />
                            </div>
                        </Box>
                    </div>
                    <div>
                        <Range label="두께" value={brushStore.lineWidth} onChange={handleLineWidthChange} prefix={"px"} />
                    </div>
                </div>
                <div>
                    <Box paddingTop={3} paddingBottom={3}><Divider/></Box>
                    <ColorSelect color={brushStore.color} onChange={handleColorChange} />
                </div>
            </div>
        </div>
    )
})

export default BrushPropBox;