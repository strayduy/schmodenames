// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

// Components
import App from './components/App';
import RoleSelection from './components/RoleSelection';
import GameSelection from './components/GameSelection';
import SpymasterGrid from './components/SpymasterGrid';
import OperativeGrid from './components/OperativeGrid';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={RoleSelection} />
            <Route path="/spymaster" component={GameSelection} />
            <Route path="/field-operative" component={GameSelection} />
            <Route path="/spymaster/game/:gameSeed" component={SpymasterGrid} />
            <Route path="/field-operative/game/:gameSeed" component={OperativeGrid} />
        </Route>
    </Router>
), document.getElementById('app'));
