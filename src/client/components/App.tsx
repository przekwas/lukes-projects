import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './public/Home';
import FrontendScreen from './public/FrontendScreen';
import ReactScreen from './public/ReactScreen';
import NodeScreen from './public/NodeScreen';
import DatabaseScreen from './public/DatabaseScreen';
import AdvancedScreen from './public/AdvancedScreen';
import BhamScreen from './public/BhamScreen';
import ComposeQuestionScreen from './public/ComposeQuestionScreen';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Login from './admin/Login';
import Portal from './admin/Portal';


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <>
                    <Navbar />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/1" component={FrontendScreen} />
                    <Route exact path="/2" component={ReactScreen} />
                    <Route exact path="/3" component={NodeScreen} />
                    <Route exact path="/4" component={DatabaseScreen} />
                    <Route exact path="/5" component={AdvancedScreen} />
                    <Route exact path="/6" component={BhamScreen} />
                    <Route exact path="/compose" component={ComposeQuestionScreen} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={Portal} />
                </>
            </Router>
        );
    }
}