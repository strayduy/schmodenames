import * as _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

const MAX_GAME_SEED = 10000;

export default class DuetGameSelection extends React.Component {
    constructor(props) {
        super(props);

        let player = this.props.params.player;
        if (player !== 'player-1' && player !== 'player-2') {
            player = null;
        }

        this.state = {
            // Random int between 1 and MAX_GAME_SEED (inclusive)
            gameSeed: Math.floor((Math.random() * MAX_GAME_SEED) + 1),
            player: player,
        };
    }

    handleGameSeedChange(event) {
        this.setState({gameSeed: event.target.value});
    }

    render() {
        let player = this.state.player;
        if (!player) {
            return (
                <div>
                    nope
                </div>
            )
        }

        let heading = player === 'player-1' ? 'Player 1' : 'Player 2';
        let playerColor = player === 'player-1' ? 'red' : 'blue';
        let gameSeed = this.state.gameSeed;

        return (
            <div>
                <h1 className="text-center text-uppercase">Duet &mdash; <span style={{color: playerColor}}>{heading}</span></h1>
                <div className="form-horizontal">
                    <div className="form-group form-group-lg">
                        <label htmlFor="game-seed" className="col-xs-4 col-sm-2 control-label">Game #</label>
                        <div className="col-xs-8 col-sm-10">
                            <input type="number" className="form-control" value={gameSeed} onChange={this.handleGameSeedChange.bind(this)} min="1" max={MAX_GAME_SEED} />
                        </div>
                    </div>
                    <Link className="btn btn-lg btn-block btn-success" to={`/duet/${player}/game/${gameSeed}`}>Play</Link>
                </div>
            </div>
        )
    }
};
