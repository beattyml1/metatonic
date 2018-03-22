import * as React from "react";
import {Route, Router} from "react-router";
import {createHashHistory} from "history";
import {Link} from "react-router-dom";

export default class App extends React.Component <any,any>
{
    render()
    {
        return (
            <Router history={createHashHistory()}>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Dashboard</Link>
                            <Link to='/'>Homes</Link>
                            <Link to='/'>Homes</Link>
                        </li>
                    </ul>
                </nav>
                <Route path='/'/>
            </Router>
        );
    }
}