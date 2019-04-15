import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './public/Home';
import ComposeQuestionScreen from './public/ComposeQuestionScreen';
import Navbar from './shared/Navbar';
import Login from './admin/Login';
import Portal from './admin/Portal';
import QuestionsScreen from './public/QuestionsScreen';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {
    return (
        <Router>
            <>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/:category/:id" component={QuestionsScreen} />
                <Route exact path="/compose" component={ComposeQuestionScreen} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={Portal} />
            </>
        </Router>
    );
}

export default App;