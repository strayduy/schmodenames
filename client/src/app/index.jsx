// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {createStore} from 'redux';
import reducer from './reducer';

// Components
import App from './components/App';
import RoleSelection from './components/RoleSelection';
import GameSelection from './components/GameSelection';
import DuetPlayerSelection from './components/DuetPlayerSelection';
import DuetGameSelection from './components/DuetGameSelection';
import {SpymasterGridContainer} from './components/SpymasterGrid';
import {OperativeGridContainer} from './components/OperativeGrid';
import {DuetGridContainer} from './components/DuetGrid';

const store = createStore(reducer);

// Wire up Google Analytics to the router
browserHistory.listen(function(location) {
    window.ga('send', 'pageview', location.pathname);
});

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={RoleSelection} />
                <Route path="/spymaster" component={GameSelection} />
                <Route path="/field-operative" component={GameSelection} />
                <Route path="/spymaster/game/:gameSeed" component={SpymasterGridContainer} />
                <Route path="/field-operative/game/:gameSeed" component={OperativeGridContainer} />
                <Route path="/duet" component={DuetPlayerSelection} />
                <Route path="/duet/:player" component={DuetGameSelection} />
                <Route path="/duet/:player/game/:gameSeed" component={DuetGridContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
