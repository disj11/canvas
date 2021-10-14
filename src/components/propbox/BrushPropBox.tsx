import {Box} from "@mui/material";
import {BrushType} from "../../models/tools/Brush";
import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faPencilAlt, faSprayCan} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import {ColorPalette, Range} from "components/input";
import PropBoxLayout from "./PropBoxLayout";
import PropBoxItem from "./PropBoxItem";

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: "4px",
        cursor: "pointer",
        padding: theme.spacing(1),
        marginRight: theme.spacing(0.5),
        "&:hover": {
            background: theme.palette.primary.light,
            "& *": {
                color: theme.palette.primary.contrastText,
            }
        },
    },
    selected: {
        background: theme.palette.primary.main,
        "& *": {
            color: theme.palette.primary.contrastText,
        }
    },
}))

const BrushPropBox = observer(() => {
    const classes = useStyles();
    const {brushStore} = useStores();

    return (
        <PropBoxLayout>
            {!brushStore.item && <div>
                <PropBoxItem label={"모양"} mb={3}>
                    <Box display="flex">
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.PENCIL && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.PENCIL)}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                        </div>
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.SPRAY && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.SPRAY)}
                        >
                            <FontAwesomeIcon icon={faSprayCan} size="lg"/>
                        </div>
                        <div
                            className={clsx(classes.button, brushStore.brushType === BrushType.CIRCLE && classes.selected)}
                            onClick={() => brushStore.setBrushType(BrushType.CIRCLE)}
                        >
                            <FontAwesomeIcon icon={faCircle} size="lg"/>
                        </div>
                    </Box>
                </PropBoxItem>
            </div>}
            <PropBoxItem mb={3}>
                <Range
                    label="두께"
                    value={brushStore.strokeWidth}
                    onChange={(strokeWidth) => brushStore.setStrokeWidth(strokeWidth)}
                    prefix={"px"}
                    min={1}
                />
            </PropBoxItem>
            <PropBoxItem label={"색상"}>
                <ColorPalette color={brushStore.stroke} onChange={(color) => brushStore.setStroke(color.hex)}
                              disableAlpha={true}/>
            </PropBoxItem>
        </PropBoxLayout>
    )
})

export default BrushPropBox;