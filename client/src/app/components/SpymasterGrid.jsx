import * as _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

const CELLS_PER_ROW = 5;

export class SpymasterGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowWords: true,
        };
        this.toggleWords = this.toggleWords.bind(this);
    }

    componentWillMount() {
        let gameSeed = this.props.params.gameSeed;
        this.props.dispatch({type: 'CREATE_GRID', gameSeed: gameSeed});
    }

    toggleWords() {
        this.setState({shouldShowWords: !this.state.shouldShowWords});
    }

    toggleGuess(i, j) {
        this.props.dispatch({type: 'TOGGLE_GUESS', i: i, j: j});
    }

    render() {
        let grid = this.props.grid;
        let heading = `Game #${grid.gameSeed}`;
        let firstTeamCss = `${grid.firstTeam} team-name-label`;
        let firstTeamName = `${_.capitalize(grid.firstTeam)} Team`;
        let cells = grid.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);
        let shouldShowWords = this.state.shouldShowWords;

        let toggleWordsBtn;

        if (shouldShowWords) {
            toggleWordsBtn = (
                <button type="button" className="btn btn-lg btn-block btn-default" onClick={this.toggleWords}>
                    Hide Words
                </button>
            );
        }
        else {
            toggleWordsBtn = (
                <button type="button" className="btn btn-lg btn-block btn-warning" onClick={this.toggleWords}>
                    Show Words
                </button>
            );
        }

        return (
            <div>
                <h1 className="text-center text-uppercase">{heading}</h1>

                <p className="text-center"><span className={firstTeamCss}>{firstTeamName}</span> goes first</p>

                <table className="table table-bordered text-center schmodenames-grid">
                    <tbody>
                        {rows.map((cells, i) => {
                            return (
                                <tr key={i}>
                                    {cells.map((cell, j) => {
                                        return (
                                            <td className={cell.className} key={j} onClick={this.toggleGuess.bind(this, i, j)}>
                                                {/* 00a0 == unicode non-breaking space */}
                                                {shouldShowWords ? <small>{cell.word}</small> : '\u00a0'}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {toggleWordsBtn}
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        'grid': state.grid,
    };
}

export const SpymasterGridContainer = connect(mapStateToProps)(SpymasterGrid);
