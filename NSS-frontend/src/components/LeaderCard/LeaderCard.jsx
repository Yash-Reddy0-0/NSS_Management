import React, { useState } from 'react';
import './LeaderCard.css';

const LeaderCard = ({ image, name, description, moreInfo }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="leader-card">
      <img src={image} alt={name} />
      <div className="leader-info">
        <h2>{name}</h2>
        <p>
          {description}
          {showMore && <>{moreInfo}</>}
        </p>
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default LeaderCard;
