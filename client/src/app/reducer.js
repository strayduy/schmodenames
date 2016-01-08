/* jshint browserify: true */
/* jshint esnext: true */
'use strict';

import * as _ from 'lodash';
import seedrandom from 'seedrandom';
import {seededShuffle} from './utils';
import {wordList} from './word-list';

const NUM_CELLS = 25;
const CELLS_PER_ROW = 5;
const NUM_FIRST_TEAM_WORDS = 9;
const NUM_SECOND_TEAM_WORDS = 8;

function createGrid(gameSeed) {
    let rng = seedrandom(gameSeed);
    let firstTeam = rng() < 0.5 ? 'red' : 'blue';
    let secondTeam = firstTeam === 'red' ? 'blue' : 'red';
    let cells = getShuffledCells(gameSeed, firstTeam, secondTeam);

    return {
        gameSeed: gameSeed,
        firstTeam: firstTeam,
        secondTeam: secondTeam,
        cells: cells,
    };
}

function getShuffledCells(gameSeed, firstTeam, secondTeam) {
    let cells = [];
    let words = wordList.slice(0);

    // Populate the list of cells with the appropriate number of each type of word
    _.times(NUM_FIRST_TEAM_WORDS, () => {
        cells.push({className: firstTeam});
    });
    _.times(NUM_SECOND_TEAM_WORDS, () => {
        cells.push({className: secondTeam});
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
}

const INITIAL_STATE = {grid: {}};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CREATE_GRID':
            return {
                grid: createGrid(action.gameSeed)
            };
    }
    return state;
}