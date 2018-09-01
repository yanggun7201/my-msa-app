import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
// import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export const Header: React.StatelessComponent<{}> = () => {
    return (
        // <Navbar>
        //     <Navbar.Header>
        //         <Navbar.Brand>
        //             <Link to="/">dankNotDank</Link>
        //         </Navbar.Brand>
        //     </Navbar.Header>
        //     <Nav>
        //         <IndexLinkContainer to="/FirstComponent">
        //             <NavItem>Page 1</NavItem>
        //         </IndexLinkContainer>
        //         <IndexLinkContainer to="/SecondComponent">
        //             <NavItem>Page 2</NavItem>
        //         </IndexLinkContainer>
        //     </Nav>
        // </Navbar>

        <AppBar position="static">
            <Toolbar>
                <IconButton aria-label="Menu" color="inherit">
                    <MenuIcon aria-haspopup="true" />
                </IconButton>
                <Typography variant="display2" color="inherit">
                    <Link style={{ color: "white" }} to="/">
                        S1
                    </Link>
                    <Link to="/FirstComponent"> Weather </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
