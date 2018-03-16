import { Component } from 'react';
import React from 'react';
import Board from './Board';
import { revert, play } from './actions';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { history, winner, stepNumber, xIsNext } = this.props;
    const current = history[stepNumber];
    const status = winner ?
      `Winner is ${winner}` :
      `Next player: ${xIsNext ? 'X' : 'O'}`;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.props.onRevert(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current} 
            onClick={this.props.onPlay}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch, props) => ({
  onRevert: move => dispatch(revert(move)),
  onPlay: pos => dispatch(play(pos))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);