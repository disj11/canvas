import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

interface Props {
    children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                {children}
            </Container>
        </React.Fragment>
    )
}

export default Layout;