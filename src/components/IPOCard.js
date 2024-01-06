// IPOCard.js
import React from 'react';
import './IPOCard.css';

const IPOCard = ({ ipo, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(ipo);
  };

  return (
    <div className="ipo-card" onClick={handleCardClick}>
      <h3>{ipo.companyName}</h3>
      <p>Symbol: {ipo.symbol}</p>
      <p>Offering Date: {ipo.offeringDate}</p>
      <p>Price Range: ${ipo.priceRangeLow} - ${ipo.priceRangeHigh}</p>
      <p>Minimum Investment: ${ipo.priceRangeLow}</p>
    </div>
  );
};

export default IPOCard;
