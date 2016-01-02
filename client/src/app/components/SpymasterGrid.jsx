import * as _ from 'lodash';
import React from 'react';
import seedrandom from 'seedrandom';
import {seededShuffle} from '../utils';

const NUM_CELLS = 25;
const CELLS_PER_ROW = 5;
const NUM_FIRST_TEAM_WORDS = 9;
const NUM_SECOND_TEAM_WORDS = 8;

export default React.createClass({
    getInitialState: function() {
        let gameSeed = this.props.params.gameSeed;
        let rng = seedrandom(gameSeed);
        let first_team = rng() < 0.5 ? 'red' : 'blue';
        let second_team = first_team === 'red' ? 'blue' : 'red';
        let cells = this.getShuffledCells(gameSeed, first_team, second_team);

        return {
            gameSeed: gameSeed,
            first_team: first_team,
            second_team: second_team,
            cells: cells,
        };
    },
    getShuffledCells: function(gameSeed, first_team, second_team) {
        let cells = [];

        for (let i = 0; i < NUM_CELLS; i++) {
            cells[i] = {class: 'neutral'};
        }

        cells[0] = {class: 'assassin'};
        _.fill(cells, {class: first_team}, 1, 1 + NUM_FIRST_TEAM_WORDS);
        _.fill(cells, {class: second_team}, 1 + NUM_FIRST_TEAM_WORDS, 1 + NUM_FIRST_TEAM_WORDS + NUM_SECOND_TEAM_WORDS);

        // Shuffle in place
        seededShuffle(cells, gameSeed);

        return cells;
    },
    render: function() {
        let cells = this.state.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);

        return (
            <table>
                <tbody>
                    {rows.map(function(cells, i) {
                        return (
                            <tr key={i}>
                                {cells.map(function(cell, j) {
                                    return (
                                        <td className={cell.class} key={j}>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
});
