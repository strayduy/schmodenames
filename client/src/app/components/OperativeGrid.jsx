import * as _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

const CELLS_PER_ROW = 5;

export const OperativeGrid = React.createClass({
    componentWillMount() {
        let gameSeed = this.props.params.gameSeed;
        this.props.dispatch({type: 'CREATE_GRID', gameSeed: gameSeed});
    },
    render: function() {
        let grid = this.props.grid;
        let heading = `Game #${grid.gameSeed}`;
        let firstTeamCss = `${grid.firstTeam} team-name-label`;
        let firstTeamName = `${_.capitalize(grid.firstTeam)} Team`;
        let cells = grid.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);

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
                                            <td key={j}>
                                                <small>{cell.word}</small>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        'grid': state.grid,
    };
}

export const OperativeGridContainer = connect(mapStateToProps)(OperativeGrid);
