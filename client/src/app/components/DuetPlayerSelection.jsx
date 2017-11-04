import React from 'react';
import {Link} from 'react-router';

export default class DuetPlayerSelection extends React.Component {
    render() {
        return (
            <div>
                <h1 className="text-center text-uppercase">Schmodenames Duet</h1>

                <div className="row">
                    <div className="col-xs-12">
                        <Link className="btn btn-lg btn-block btn-danger text-smallcaps" to="/duet/player-1">
                            <small className="text-lowercase">I am</small>
                            <br />
                            <span className="text-uppercase">Player 1</span>
                        </Link>

                        <br />

                        <Link className="btn btn-lg btn-block btn-primary text-smallcaps" to="/duet/player-2">
                            <small className="text-lowercase">I am</small>
                            <br />
                            <span className="text-uppercase">Player 2</span>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12" style={{marginTop: '30px'}}>
                        <div className="text-center">
                            <Link className="btn btn-lg btn-link" to="/">
                                Switch to Team Mode
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
