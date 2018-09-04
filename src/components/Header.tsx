import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { Link } from "react-router-dom";

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <AppBar position="static" className="msa-header">
            <Toolbar>
                <IconButton aria-label="Menu" color="inherit">
                    <MenuIcon aria-haspopup="true" />
                </IconButton>
                <Typography variant="display2" color="inherit">
                    <Link style={{ color: "white", fontSize: "2rem" }} to="/">
                        Weather
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
