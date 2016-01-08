import * as _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

const CELLS_PER_ROW = 5;

export const SpymasterGrid = React.createClass({
    getInitialState: function() {
        return {
            shouldShowWords: false,
        };
    },
    componentWillMount() {
        let gameSeed = this.props.params.gameSeed;
        this.props.dispatch({type: 'CREATE_GRID', gameSeed: gameSeed});
    },
    toggleWords: function() {
        this.setState({shouldShowWords: !this.state.shouldShowWords});
    },
    render: function() {
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
                        {rows.map(function(cells, i) {
                            return (
                                <tr key={i}>
                                    {cells.map(function(cell, j) {
                                        return (
                                            <td className={cell.className} key={j}>
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
});

function mapStateToProps(state) {
    return {
        'grid': state.grid,
    };
}

export const SpymasterGridContainer = connect(mapStateToProps)(SpymasterGrid);
