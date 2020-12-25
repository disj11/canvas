import {Box, Select, Typography} from "@material-ui/core";
import {BrushType} from "../../models/canvas/Brush";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
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

const BrushPropBox = observer(() => {
    const classes = useStyles();
    const {canvasStore} = useStores();

    const handleBrushChange = (e: any) => {
        canvasStore.brushType = BrushType.valueOf(e.target.value) || BrushType.PENCIL;
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
                <Select
                    className={classes.input}
                    native
                    onChange={handleBrushChange}
                    value={canvasStore.brushType.value}
                    label="브러시 모양"
                    fullWidth
                >
                    {BrushType.values().map(brush => (
                        <option key={brush.value} value={brush.value}>{brush.display}</option>
                    ))}
                </Select>
            </div>
        </div>
    )
})

export default BrushPropBox;