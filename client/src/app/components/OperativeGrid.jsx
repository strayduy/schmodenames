import * as _ from 'lodash';
import React from 'react';
import seedrandom from 'seedrandom';
import {seededShuffle} from '../utils';
import {wordList} from '../word-list';

const NUM_CELLS = 25;
const CELLS_PER_ROW = 5;

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
        let words = wordList.slice(0);

        // Shuffle the word list
        seededShuffle(words, gameSeed);

        // Assign a word (randomly chosen via shuffle) to each cell
        _.times(NUM_CELLS, (i) => {
            cells.push({word: words[i]});
        });

        return cells;
    },
    render: function() {
        let heading = `Game #${this.state.gameSeed}`;
        let first_team_css = `${this.state.first_team} team-name-label`;
        let first_team_name = `${_.capitalize(this.state.first_team)} Team`;
        let cells = this.state.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);

        return (
            <div>
                <h1 className="text-center text-uppercase">{heading}</h1>

                <p className="text-center"><span className={first_team_css}>{first_team_name}</span> goes first</p>

                <table className="table table-bordered text-center schmodenames-grid">
                    <tbody>
                        {rows.map(function(cells, i) {
                            return (
                                <tr key={i}>
                                    {cells.map(function(cell, j) {
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
