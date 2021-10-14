import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {CircularProgress} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

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