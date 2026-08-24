import React, { useState, useEffect, useContext } from 'react';
import TrainerCard from '../components/TrainerCard';
import { AuthContext } from '../context/AuthContext';

const ClassesPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Form states
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/trainers`);
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        const data = await response.json();
        setTrainers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [apiUrl]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      const response = await fetch(`${apiUrl}/api/v1/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          trainerId: selectedTrainer,
          className,
          date,
          timeSlot: selectedTimeSlot
        })
      });

      const data = await response.json();

      if (response.status === 201) {
        setFormSuccess('Booking successful!');
        setSelectedTrainer('');
        setClassName('');
        setDate('');
        setSelectedTimeSlot('');
      } else {
        setFormError(data.message || (data.errors && data.errors.join(', ')) || 'Booking failed');
      }
    } catch (err) {
      setFormError('Network error during booking');
    }
  };

  const filteredTrainers = trainers.filter(trainer => 
    trainer.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-8">
      <h2 className="mb-6">Classes</h2>
      
      <div className="card mb-8">
        <h3 className="mb-4">Search Trainers</h3>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <input 
            type="text" 
            placeholder="Search by specialization (e.g. yoga)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid-cards mb-8">
        {loading && <p>Loading trainers...</p>}
        {error && <p className="text-error">Error: {error}</p>}
        {!loading && !error && filteredTrainers.map(trainer => (
          <TrainerCard 
            key={trainer._id}
            name={trainer.name}
            specialization={trainer.specialization}
            available={trainer.available}
          />
        ))}
        {!loading && !error && filteredTrainers.length === 0 && (
          <p>No trainers found matching your search.</p>
        )}
      </div>

      <div className="card form-container" style={{ margin: 0, maxWidth: '100%' }}>
        <h3 className="mb-4">Book a Class</h3>
        {formSuccess && <p className="text-success mb-4">{formSuccess}</p>}
        {formError && <p className="text-error mb-4">{formError}</p>}
        
        <form onSubmit={handleBooking} className="flex flex-col" style={{ maxWidth: '400px' }}>
          <div className="form-group">
            <label>Trainer</label>
            <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)} required>
              <option value="">Select a Trainer</option>
              {trainers.filter(t => t.available).map(t => (
                <option key={t._id} value={t._id}>{t.name} - {t.specialization}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Class Name</label>
            <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <select value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} required>
              <option value="">Select a time</option>
              <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
            </select>
          </div>
          
          <div className="form-group">
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Selected Trainer ID: {selectedTrainer || 'None'}</p>
          </div>

          <button type="submit" className="btn btn-primary mt-4" style={{ width: 'auto', alignSelf: 'flex-start' }}>Book Class</button>
        </form>
      </div>
    </div>
  );
};

export default ClassesPage;
