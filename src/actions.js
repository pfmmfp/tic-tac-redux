export function play(pos) {
  return {
    type: 'PLAY',
    pos
  }
}

export function revert(toMove) {
  return {
    type: 'REVERT',
    toMove
  }
}