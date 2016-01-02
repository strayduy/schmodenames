import * as _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

const MAX_GAME_SEED = 10000;

export default React.createClass({
    getInitialState: function() {
        let role = 'field-operative';

        if (_.startsWith(this.props.location.pathname, '/spymaster')) {
            role = 'spymaster';
        }

        return {
            // Random int between 1 and MAX_GAME_SEED (inclusive)
            gameSeed: Math.floor((Math.random() * MAX_GAME_SEED) + 1),
            role: role,
        };
    },
    handleGameSeedChange: function(event) {
        this.setState({gameSeed: event.target.value});
    },
    render: function() {
        let role = this.state.role;
        let gameSeed = this.state.gameSeed;

        return (
            <div>
                <input type="number" value={gameSeed} onChange={this.handleGameSeedChange} min="1" max={MAX_GAME_SEED} />
                <br />
                <Link to={`/${role}/grid/${gameSeed}`}>Go</Link>
            </div>
        )
    }
});
