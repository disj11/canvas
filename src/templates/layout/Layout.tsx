import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {CircularProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    progressWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))

const Layout = ({ loading, children }: Props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                {loading ? (
                    <div className={classes.progressWrapper}><CircularProgress /></div>
                ) : children}
            </div>
        </React.Fragment>
    )
}

interface Props {
    loading?: boolean;
    children: React.ReactElement | React.ReactElement[];
}

export default Layout;