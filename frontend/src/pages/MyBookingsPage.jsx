import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/bookings/my`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [apiUrl, token]);

  if (loading) return <div className="container mt-8"><p>Loading bookings...</p></div>;
  if (error) return <div className="container mt-8"><p className="text-error">Error: {error}</p></div>;

  return (
    <div className="container mt-8">
      <h2 className="mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Trainer Name</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.className}</td>
                  <td>{booking.trainerId?.name || 'N/A'}</td>
                  <td>{booking.trainerId?.specialization || 'N/A'}</td>
                  <td>{booking.date}</td>
                  <td>{booking.timeSlot}</td>
                  <td>
                    <span className={`badge ${booking.status === 'confirmed' || booking.status === 'completed' ? 'badge-success' : 'badge-error'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
