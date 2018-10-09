import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './public/Home';
import Frontend from './public/Frontend';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <>
                    <Navbar></Navbar>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/frontend" component={Frontend} />
                    <Footer></Footer>
                </>
            </Router>
        );
    }
}