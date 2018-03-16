import gameReducer from './reducers';
import { play, revert } from './actions';

test('it provides initial state', () => {
  expect(gameReducer(undefined, { type: 'ANY' })).toEqual({
    history: [Array(9).fill(null)],
    xIsNext: true,
    stepNumber: 0,
    winner: null
  });
});

test('play x', () => {
  const initialState = {
    history: [Array(9).fill(null)],
    xIsNext: true,
    stepNumber: 0,
    winner: null
  };
  expect(gameReducer(initialState, play(0))).toEqual({
    history: [
      Array(9).fill(null),
      ['X', ...Array(8).fill(null)]
    ],
    xIsNext: false,
    stepNumber: 1,
    winner: null
  });
});

test('play o', () => {
  const initialState = {
    history: [
      Array(9).fill(null),
      ['X', ...Array(8).fill(null)]
    ],
    xIsNext: false,
    stepNumber: 1,
    winner: null
  };
  expect(gameReducer(initialState, play(3))).toEqual({
    history: [
      Array(9).fill(null),
      ['X', ...Array(8).fill(null)],
      ['X', null, null, 'O', ...Array(5).fill(null)]
    ],
    xIsNext: true,
    stepNumber: 2,
    winner: null
  });
});

test('detect winner', () => {
  const initialState = {
    history: [
      ['X', 'X', ...Array(7).fill(null)]
    ],
    xIsNext: true,
    stepNumber: 1,
    winner: null
  };
  expect(gameReducer(initialState, play(2))).toEqual({
    history: [
      ['X', 'X', ...Array(7).fill(null)],
      ['X', 'X', 'X', ...Array(6).fill(null)]
    ],
    xIsNext: false,
    stepNumber: 2,
    winner: 'X'
  });
});

test('should not allow to play if there is a winner', () => {
  const initialState = {
    history: [
      ['X', 'X', 'X', ...Array(6).fill(null)]
    ],
    xIsNext: true,
    stepNumber: 1,
    winner: 'X'
  };
  expect(gameReducer(initialState, play(8))).toEqual(initialState);
});

test('should not override plays', () => {
  const initialState = {
    history: [
      ['X', ...Array(8).fill(null)]
    ],
    xIsNext: false,
    stepNumber: 1,
    winner: null
  };
  expect(gameReducer(initialState, play(0))).toEqual(initialState);
});

test('revert play', () => {
  const initialState = {
    history: [
      Array(9).fill(null),
      ['X', ...Array(8).fill(null)],
      ['X', null, null, 'O', ...Array(5).fill(null)]
    ],
    xIsNext: true,
    stepNumber: 2,
    winner: null
  };
  expect(gameReducer(initialState, revert(0))).toEqual({
    history: [
      Array(9).fill(null)
    ],
    xIsNext: true,
    stepNumber: 0,
    winner: null
  });
});