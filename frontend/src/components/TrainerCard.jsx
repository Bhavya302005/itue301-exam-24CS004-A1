import React from 'react';

const TrainerCard = ({ name, specialization, available }) => {
  return (
    <div className={`card flex flex-col gap-1 ${available ? 'available' : 'fully-booked'}`}>
      <h3 style={{ marginBottom: '0.25rem' }}>{name}</h3>
      <p style={{ margin: 0 }}>{specialization}</p>
      <div className="mt-4">
        <span className={`badge ${available ? 'badge-success' : 'badge-error'}`}>
          {available ? 'Available' : 'Fully Booked'}
        </span>
      </div>
    </div>
  );
};

export default TrainerCard;
