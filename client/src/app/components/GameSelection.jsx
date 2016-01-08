import * as _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

const MAX_GAME_SEED = 10000;

export default class GameSelection extends React.Component {
    constructor(props) {
        super(props);

        let role = 'field-operative';

        if (_.startsWith(this.props.location.pathname, '/spymaster')) {
            role = 'spymaster';
        }

        this.state = {
            // Random int between 1 and MAX_GAME_SEED (inclusive)
            gameSeed: Math.floor((Math.random() * MAX_GAME_SEED) + 1),
            role: role,
        };
    }

    handleGameSeedChange(event) {
        this.setState({gameSeed: event.target.value});
    }

    render() {
        let role = this.state.role;
        let heading = role == 'spymaster' ? 'Spymaster' : 'Field Operative';
        let gameSeed = this.state.gameSeed;

        return (
            <div>
                <h1 className="text-center text-uppercase">{heading}</h1>
                <div className="form-horizontal">
                    <div className="form-group form-group-lg">
                        <label htmlFor="game-seed" className="col-xs-4 col-sm-2 control-label">Game #</label>
                        <div className="col-xs-8 col-sm-10">
                            <input type="number" className="form-control" value={gameSeed} onChange={this.handleGameSeedChange} min="1" max={MAX_GAME_SEED} />
                        </div>
                    </div>
                    <Link className="btn btn-lg btn-block btn-success" to={`/${role}/game/${gameSeed}`}>Play</Link>
                </div>
            </div>
        )
    }
};
