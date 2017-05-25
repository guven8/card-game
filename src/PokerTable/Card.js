import React from 'react';

const Card = ({num, suit, value}) => (
  <div className="card">
    <span className="num">{num}</span>
    <span className={`suit ${suit}`}/>
    <span className="value">Value: {value}</span>
  </div>
);

export default Card;
