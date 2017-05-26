import React from 'react';

/* The simplest component in the project, simply represents
one card, it receives its number, value and suit, which is
displayed and passed in a className to give it the corresponding
background image */

const Card = ({num, suit, value}) => (
  <div className="card">
    <span className="num">{num}</span>
    <span className={`suit ${suit}`}/>
    <span className="value">Value: {value}</span>
  </div>
);

export default Card;
