import * as _ from 'lodash';
import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

const CELLS_PER_ROW = 5;

export class DuetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        let player = this.props.params.player;
        let gameSeed = this.props.params.gameSeed;
        this.props.dispatch({type: 'CREATE_DUET_GRID', player: player, gameSeed: gameSeed});
    }

    toggleCell(i, j) {
        let player = this.props.params.player;
        let grid = this.props.grid;
        let cell = grid.cells[i * CELLS_PER_ROW + j];
        let cellValue = cell.value.split('-')[player === 'player-1' ? 0 : 1];

        if ((player === 'player-1' && cellValue === 'red') || (player === 'player-2' && cellValue === 'blue')) {
            this.props.dispatch({type: 'TOGGLE_GUESS', i: i, j: j});
        }
        else if (cellValue === 'neutral' || cellValue === 'assassin') {
            this.openModal(cell.word);
        }
    }

    openModal(selectedWord) {
        this.setState({
            isModalOpen: true,
            selectedWord: selectedWord,
        });
    }

    closeModal() {
        this.setState({isModalOpen: false});
    }

    markCell(color) {
        let selectedWord = this.state.selectedWord;
        this.props.dispatch({type: 'MARK_DUET_CELL', selectedWord: selectedWord, color: color});
        this.closeModal();
    }

    incrementCluesRemaining() {
        this.props.dispatch({type: 'INCREMENT_CLUES_REMAINING'});
    }

    decrementCluesRemaining() {
        this.props.dispatch({type: 'DECREMENT_CLUES_REMAINING'});
    }

    render() {
        let grid = this.props.grid;
        let heading = `Game #${grid.gameSeed}`;
        let cells = grid.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);
        let modalStyle = {
            content: {
                background: 'transparent',
                border: 'none',
            },
        };
        let selectedWord = this.state.selectedWord;
        let cluesRemaining = this.props.cluesRemaining;

        return (
            <div>
                <h1 className="text-center text-uppercase">{heading}</h1>

                <table className="table table-bordered text-center schmodenames-grid">
                    <tbody>
                        {rows.map((cells, i) => {
                            return (
                                <tr key={i}>
                                    {cells.map((cell, j) => {
                                        return (
                                            <td className={cell.className} key={j} onClick={this.toggleCell.bind(this, i, j)}>
                                                <small>{cell.word}</small>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="clues-remaining-container text-center">
                    <div>
                        <strong>Clues remaining</strong>
                    </div>
                    <div>
                        <button className="btn btn-link btn-lg" onClick={this.decrementCluesRemaining.bind(this)}>&#10134;</button>
                        {cluesRemaining}
                        <button className="btn btn-link btn-lg" onClick={this.incrementCluesRemaining.bind(this)}>&#10133;</button>
                    </div>
                </div>

                <Modal
                    className="Modal__Bootstrap modal-dialog color-select-modal"
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title text-center">{selectedWord}</h4>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-block text-uppercase green" onClick={this.markCell.bind(this, 'green')}>Green</button>
                            <button className="btn btn-block text-uppercase duet-neutral" onClick={this.markCell.bind(this, 'duet-neutral')}>Neutral</button>
                            <button className="btn btn-block text-uppercase assassin" onClick={this.markCell.bind(this, 'assassin')}>Assassin</button>
                            <button className="btn btn-block text-uppercase clear" onClick={this.markCell.bind(this, 'clear')}>Clear</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        'grid': state.grid,
        'cluesRemaining': state.cluesRemaining,
    };
}

export const DuetGridContainer = connect(mapStateToProps)(DuetGrid);
