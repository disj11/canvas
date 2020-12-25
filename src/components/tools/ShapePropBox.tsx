import {Box, Select, Typography} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import {ShapeType} from "../../models/canvas/Shape";
import {useStores} from "../../hooks/useStores";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3),
    },
    input: {
        padding: theme.spacing(1),
        borderRadius: 4,
        backgroundColor: "#fff",
    }
}))

const ShapePropBox = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();

    const handleShapeChange = (e: any) => {
        canvasStore.shapeType = ShapeType.valueOf(e.target.value) || ShapeType.CIRCLE;
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
                <Select
                    className={classes.input}
                    native
                    onChange={handleShapeChange}
                    value={canvasStore.shapeType.value}
                    label="셰이프 모양"
                    fullWidth
                >
                    {ShapeType.values().map(shape => (
                        <option key={shape.value} value={shape.value}>{shape.display}</option>
                    ))}
                </Select>
            </div>
        </div>
    )
})

export default ShapePropBox;