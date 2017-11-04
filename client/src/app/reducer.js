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
const NUM_DUET_WORDS_PER_PLAYER = 5;
const NUM_DUET_WORDS_SHARED = 3;

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

function markCell(grid, selectedWord, color) {
    let new_grid = _.assign({}, grid);
    let cells = [];

    _.forEach(grid.cells, (cell, i) => {
        if (cell.word === selectedWord) {
            cell.color = color;
        }
        cells.push(cell);
    });

    new_grid.cells = cells;

    return new_grid;
}

function toggleGuess(grid, i, j) {
    let new_grid = _.assign({}, grid);
    let css_classes = new_grid.cells[i * CELLS_PER_ROW + j].className.split(' ');

    if (css_classes.includes('guessed')) {
        css_classes = css_classes.filter(c => c !== 'guessed');
    }
    else {
        css_classes.push('guessed');
    }

    new_grid.cells[i * CELLS_PER_ROW + j].className = css_classes.join(' ');

    return new_grid;
}

function createDuetGrid(player, gameSeed) {
    let rng = seedrandom(gameSeed);
    let cells = getShuffledDuetCells(player, gameSeed);

    return {
        gameSeed: gameSeed,
        player: player,
        cells: cells,
    };
}

function getShuffledDuetCells(player, gameSeed) {
    let cells = [];
    let words = wordList.slice(0);

    // 5 red-neutral
    // 5 neutral-blue
    // 3 red-blue
    // 1 assassin-assassin
    // 1 red-assassin
    // 1 neutral-assassin
    // 1 assassin-blue
    // 1 assassin-neutral
    // 7 neutral-neutral

    // Populate the list of cells with the appropriate number of each type of word
    _.times(NUM_DUET_WORDS_PER_PLAYER, () => {
        cells.push({value: 'red-neutral'});
        cells.push({value: 'neutral-blue'});
    });
    _.times(NUM_DUET_WORDS_SHARED, () => {
        cells.push({value: 'red-blue'});
    });
    cells.push({value: 'assassin-assassin'});
    cells.push({value: 'red-assassin'});
    cells.push({value: 'neutral-assassin'});
    cells.push({value: 'assassin-blue'});
    cells.push({value: 'assassin-neutral'});
    _.times(NUM_CELLS - NUM_DUET_WORDS_PER_PLAYER * 2 - NUM_DUET_WORDS_SHARED - 5, () => {
        cells.push({value: 'neutral-neutral'});
    });

    // Shuffle cells in place
    seededShuffle(cells, gameSeed);

    // Shuffle the word list, too
    seededShuffle(words, gameSeed);

    // Assign a word (randomly chosen via shuffle) to each cell
    _.forEach(cells, (cell, i) => {
        cell.word = words[i];

        let className = '';
        if (player === 'player-1') {
            switch (cell.value.split('-')[0]) {
                case 'red':
                    className = 'neutral';
                    break;
                case 'assassin':
                    className = 'assassin';
                    break;
            }
        }
        else if (player === 'player-2') {
            switch (cell.value.split('-')[1]) {
                case 'blue':
                    className = 'neutral';
                    break;
                case 'assassin':
                    className = 'assassin';
                    break;
            }
        }

        cell.className = className;
    });

    return cells;
}

function markDuetCell(grid, selectedWord, color) {
    let new_grid = _.assign({}, grid);
    let cells = [];

    _.forEach(grid.cells, (cell, i) => {
        if (cell.word === selectedWord) {
            cell.className = color;
        }
        cells.push(cell);
    });

    new_grid.cells = cells;

    return new_grid;
}

const INITIAL_STATE = {grid: {}};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CREATE_GRID':
            return {
                grid: createGrid(action.gameSeed)
            };
        case 'MARK_CELL':
            return {
                grid: markCell(state.grid, action.selectedWord, action.color)
            };
        case 'TOGGLE_GUESS':
            return {
                grid: toggleGuess(state.grid, action.i, action.j)
            };
        case 'CREATE_DUET_GRID':
            return {
                grid: createDuetGrid(action.player, action.gameSeed)
            };
        case 'MARK_DUET_CELL':
            return {
                grid: markDuetCell(state.grid, action.selectedWord, action.color)
            };
    }
    return state;
}
