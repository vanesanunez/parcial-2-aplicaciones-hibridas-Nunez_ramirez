import React from 'react';
import './Card.scss';

const Card = ({ title, description, location, date, tags, children }) => {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}

      {description && (
        <p className="description" title={description}>
          {description.length > 150 ? description.slice(0, 150) + '...' : description}
        </p>
      )}

      {location && (
        <p className="location">{location}</p>
      )}

      {date && (
        <p className="date">{new Date(date).toLocaleDateString()}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="card-children">
        {children}
      </div>
    </div>
  );
};

export default Card;