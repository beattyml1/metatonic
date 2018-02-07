import * as React from "react";
import {} from 'react-router-bootstrap';
import {} from 'react-router'
import {} from 'react-router-dom'
import {} from 'react-bootstrap'

export class Navbar  extends React.Component <void, any[]> {
    render() {
        return (
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">Navbar</a>

                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav mr-auto">
                        {this.props.items.map(item =>
                            <li>

                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        )
    }
}

export class NavLink  extends React.Component <any&{to}, void> {
    render() {
        return (
            <LinkContainer to={}>
                <NavItem {...this.props}>

                </NavItem>
            </LinkContainer>
        )
    }
}
export class App extends React.Component <void, any> {
    render() {
        let navItems
        return (
            <>
                <header>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#home">React-Bootstrap</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Link
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.4}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                </header>
                <main>

                </main>
                <footer>

                </footer>
            </>
        );
    }
}