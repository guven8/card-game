import React from 'react';

const Card = ({num, suit, value}) => {
  return (
    <div className="card">
      <span className="num">{num}</span>
      <span className={`suit ${suit}`}/>
      <span className="value">Value: {value}</span>
    </div>
  );
}

export default Card;
