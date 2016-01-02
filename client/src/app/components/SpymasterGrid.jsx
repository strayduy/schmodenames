import * as _ from 'lodash';
import React from 'react';
import seedrandom from 'seedrandom';
import {seededShuffle} from '../utils';
import {wordList} from '../word-list';

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
            shouldShowWords: false,
        };
    },
    getShuffledCells: function(gameSeed, first_team, second_team) {
        let cells = [];
        let words = wordList.slice(0);

        // Populate the list of cells with the appropriate number of each type of word
        _.times(NUM_FIRST_TEAM_WORDS, () => {
            cells.push({className: first_team});
        });
        _.times(NUM_SECOND_TEAM_WORDS, () => {
            cells.push({className: second_team});
        });
        cells.push({className: 'assassin'});
        _.times(NUM_CELLS - NUM_FIRST_TEAM_WORDS - NUM_SECOND_TEAM_WORDS - 1, () => {
            cells.push({className: 'neutral'});
        });

        // Shuffle cells in place
        seededShuffle(cells, gameSeed);

        // Shuffle the word list, too
        seededShuffle(words, gameSeed);

        // Assign a word (randomly chosen via shuffle) to each cell
        _.forEach(cells, (cell, i) => {
            cell.word = words[i];
        });

        return cells;
    },
    toggleWords: function() {
        this.setState({shouldShowWords: !this.state.shouldShowWords});
    },
    render: function() {
        let heading = `Game #${this.state.gameSeed}`;
        let first_team_css = `${this.state.first_team} team-name-label`;
        let first_team_name = `${_.capitalize(this.state.first_team)} Team`;
        let cells = this.state.cells;
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

                <p className="text-center"><span className={first_team_css}>{first_team_name}</span> goes first</p>

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
