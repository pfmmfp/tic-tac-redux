import React from 'react';

export default props => (
  <button className="square" onClick={props.onSelect}>
    {props.value}
  </button>
);