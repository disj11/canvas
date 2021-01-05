import { Box, Divider, Typography } from "@material-ui/core";
import { BrushType } from "../../models/tools/Brush";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/useStores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSprayCan, faCircle } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { CommonColor } from "../../models/color/CommonColor";
import { ColorPalette, Range } from "components/input";
import PropBoxLayout from "./PropBoxLayout";

const useStyles = makeStyles(theme => ({
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

    return (
        <PropBoxLayout>
            <div className={classes.propBox}>
                {!brushStore.item && <div>
                    <Box mb={1}>
                        <Typography variant={"caption"}>모양</Typography>
                    </Box>
                    <Box display="flex">
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.PENCIL && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.PENCIL)}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                        </div>
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.SPRAY && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.SPRAY)}
                        >
                            <FontAwesomeIcon icon={faSprayCan} size="lg" />
                        </div>
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.CIRCLE && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.CIRCLE)}
                        >
                            <FontAwesomeIcon icon={faCircle} size="lg" />
                        </div>
                    </Box>
                </div>}
                <div>
                    <Range label="두께" value={brushStore.strokeWidth} onChange={(strokeWidth) => brushStore.setStrokeWidth(strokeWidth)} prefix={"px"} />
                </div>
            </div>
            <div>
                <Box paddingTop={3} paddingBottom={3}><Divider /></Box>
                <ColorPalette color={brushStore.stroke} onChange={(color) => brushStore.setStroke(color.hex)} disableAlpha={true} />
            </div>
        </PropBoxLayout>
    )
})

export default BrushPropBox;