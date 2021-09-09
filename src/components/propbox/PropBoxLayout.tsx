import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    propBoxWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
}))

const PropBoxLayout: React.FC = observer(({ children }) => {
    const classes = useStyles();
    const { canvasStore, objectManagerStore } = useStores();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant={"h6"} color={"primary"}>{objectManagerStore.activeObject ? objectManagerStore.getObjectTypeName() : canvasStore.canvasMode.display}</Typography>
            </div>
            <div className={classes.propBoxWrapper}>
                {children}
            </div>
        </div>
    )
})

export default PropBoxLayout;