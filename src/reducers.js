import calculateWinner from './winner';

const initialState = {
  history: [Array(9).fill(null)],
  xIsNext: true,
  stepNumber: 0,
  winner: null
};

const play = (state, action) => {
  const { history, xIsNext } = state;
  const latestPlay = history[history.length - 1];
  if (latestPlay[action.pos] || calculateWinner(latestPlay)) {
    return state;
  }
  const newPlay = latestPlay.slice();
  newPlay[action.pos] = xIsNext ? 'X' : 'O';
  return {
    history: [
      ...history,
      newPlay
    ],
    xIsNext: !state.xIsNext,
    stepNumber: state.stepNumber + 1,
    winner: calculateWinner(newPlay)
  };
};

const revert = (state, action) => {
  const { history, stepNumber } = state;
  return {
    history: [
      ...history.slice(0, action.toMove + 1)
    ],
    xIsNext: (stepNumber % 2) === 0,
    stepNumber: action.toMove,
    winner: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY':
      return play(state, action);
    case 'REVERT':
      return revert(state, action);
    default:
      return state;
  }
};