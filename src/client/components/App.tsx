import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './public/Home';
import FrontendScreen from './public/FrontendScreen';
import ReactScreen from './public/ReactScreen';
import NodeScreen from './public/NodeScreen';
import DatabaseScreen from './public/DatabaseScreen';
import AdvancedScreen from './public/AdvancedScreen';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <>
                    <Navbar></Navbar>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/frontend" component={FrontendScreen} />
                    <Route exact path="/react" component={ReactScreen} />
                    <Route exact path="/node" component={NodeScreen} />
                    <Route exact path="/database" component={DatabaseScreen} />
                    <Route exact path="/advanced" component={AdvancedScreen} />
                    <Footer></Footer>
                </>
            </Router>
        );
    }
}