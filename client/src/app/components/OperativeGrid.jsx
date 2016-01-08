import * as _ from 'lodash';
import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

const CELLS_PER_ROW = 5;

export class OperativeGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        let gameSeed = this.props.params.gameSeed;
        this.props.dispatch({type: 'CREATE_GRID', gameSeed: gameSeed});
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
        this.props.dispatch({type: 'MARK_CELL', selectedWord: selectedWord, color: color});
        this.closeModal();
    }

    render() {
        let grid = this.props.grid;
        let heading = `Game #${grid.gameSeed}`;
        let firstTeamCss = `${grid.firstTeam} team-name-label`;
        let firstTeamName = `${_.capitalize(grid.firstTeam)} Team`;
        let cells = grid.cells;
        let rows = _.chunk(cells, CELLS_PER_ROW);
        let modalStyle = {
            content: {
                background: 'transparent',
                border: 'none',
            },
        };
        let selectedWord = this.state.selectedWord;

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
                                            <td className={cell.color} key={j} onClick={this.openModal.bind(this, cell.word)}>
                                                <small>{cell.word}</small>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

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
                            <button className="btn btn-block text-uppercase red" onClick={this.markCell.bind(this, 'red')}>Red</button>
                            <button className="btn btn-block text-uppercase blue" onClick={this.markCell.bind(this, 'blue')}>Blue</button>
                            <button className="btn btn-block text-uppercase neutral" onClick={this.markCell.bind(this, 'neutral')}>Neutral</button>
                            <button className="btn btn-block text-uppercase assassin" onClick={this.markCell.bind(this, 'assassin')}>The Assassin</button>
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
    };
}

export const OperativeGridContainer = connect(mapStateToProps)(OperativeGrid);
