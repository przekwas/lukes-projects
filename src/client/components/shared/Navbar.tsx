import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <Link to="/" className="navbar-brand" href="#">Covalence Questions</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/1" className="nav-link">Frontend</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/2" className="nav-link">React</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/3" className="nav-link">Node</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/4" className="nav-link">Database</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/5" className="nav-link">Advanced Topics</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/6" className="nav-link">I am Bham</Link>
                        </li>
                        <li className="nav-item ml-2 active">
                            <Link to="/compose" className="nav-link btn btn-info shadow-lg">Ask A Question</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}