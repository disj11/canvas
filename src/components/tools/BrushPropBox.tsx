import {Box, FormControl, InputLabel, Select, Typography} from "@material-ui/core";
import {BrushType} from "../../models/canvas/Brush";
import React from "react";
import {CanvasStore} from "../../stores/CanvasStore";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";

interface Props {
    canvasStore: CanvasStore;
}

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

const BrushPropBox = observer(({canvasStore}: Props) => {
    const classes = useStyles();

    const handleBrushChange = (e: any) => {
        canvasStore.brushType = BrushType.valueOf(e.target.value) || BrushType.PENCIL;
    }

    return (
        <div>
            <div className={classes.title}>
                <Typography variant={"subtitle1"}>브러시</Typography>
            </div>
            <div>
                <Box mb={1}>
                    <Typography variant={"caption"}>브러시 모양</Typography>
                </Box>
                <Select
                    className={classes.input}
                    native
                    onChange={handleBrushChange}
                    value={canvasStore.brushType.value}
                    label="브러시 모양"
                    inputProps={{
                        name: 'brush',
                        id: 'brush',
                    }}
                >
                    {BrushType.values().map(brush => (
                        <option key={brush.value} value={brush.value}>{brush.display}</option>
                    ))}
                </Select>
                {/*<FormControl variant="filled">
                    <InputLabel htmlFor="brush">브러시 모양</InputLabel>

                </FormControl>*/}
            </div>
        </div>
    )
})

export default BrushPropBox;