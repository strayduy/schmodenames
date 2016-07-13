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
import {SpymasterGridContainer} from './components/SpymasterGrid';
import {OperativeGridContainer} from './components/OperativeGrid';

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
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
