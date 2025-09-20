import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Itinerary.css';

interface Location {
  id: string;
  name: string;
  address: string;
  time: string;
  type: 'household' | 'clinic' | 'school' | 'community';
  patients: number;
  status: 'pending' | 'in-progress' | 'completed';
  distance?: string;
  notes?: string;
}

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const todayLocations: Location[] = [
    {
      id: '1',
      name: 'Kibera Health Center',
      address: 'Kibera, Nairobi',
      time: '9:00 AM',
      type: 'clinic',
      patients: 15,
      status: 'completed',
      distance: '2.3 km',
      notes: 'Vaccination clinic'
    },
    {
      id: '2',
      name: 'Mama Sarah\'s House',
      address: 'House 45, Kibera',
      time: '11:00 AM',
      type: 'household',
      patients: 1,
      status: 'completed',
      distance: '0.8 km',
      notes: 'Postnatal checkup'
    },
    {
      id: '3',
      name: 'Kibera Primary School',
      address: 'Kibera School Road',
      time: '2:00 PM',
      type: 'school',
      patients: 30,
      status: 'in-progress',
      distance: '1.5 km',
      notes: 'Health education session'
    },
    {
      id: '4',
      name: 'Community Hall',
      address: 'Kibera Community Center',
      time: '4:00 PM',
      type: 'community',
      patients: 25,
      status: 'pending',
      distance: '2.0 km',
      notes: 'Nutrition workshop'
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'household': return '🏠';
      case 'clinic': return '🏥';
      case 'school': return '🏫';
      case 'community': return '👥';
      default: return '📍';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCheckIn = () => {
    alert('Checked in successfully! +50 XP earned!');
    // Update location status logic here
  };

  return (
    <div className="itinerary">
      <header className="itinerary-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>Daily Itinerary</h1>
        <button className="map-view-btn" onClick={() => navigate('/map')}>
          🗺️
        </button>
      </header>

      <div className="date-section">
        <h3>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        <p className="summary">📍 {todayLocations.length} locations • 👥 {todayLocations.reduce((sum, loc) => sum + loc.patients, 0)} patients</p>
      </div>

      <div className="timeline">
        {todayLocations.map((location, index) => (
          <div key={location.id} className="timeline-item">
            <div className="timeline-marker" style={{ backgroundColor: getStatusColor(location.status) }}>
              {location.status === 'completed' && '✓'}
            </div>
            {index < todayLocations.length - 1 && <div className="timeline-line" />}
            
            <div 
              className={`location-card ${location.status}`}
              onClick={() => handleLocationClick(location)}
            >
              <div className="location-time">
                <span>{location.time}</span>
              </div>
              
              <div className="location-content">
                <div className="location-header">
                  <span className="location-icon">{getLocationIcon(location.type)}</span>
                  <div className="location-info">
                    <h3>{location.name}</h3>
                    <p className="address">{location.address}</p>
                  </div>
                </div>
                
                <div className="location-meta">
                  <span className="meta-item">
                    <span className="icon">👥</span> {location.patients} patients
                  </span>
                  {location.distance && (
                    <span className="meta-item">
                      <span className="icon">📏</span> {location.distance}
                    </span>
                  )}
                </div>
                
                {location.notes && (
                  <div className="location-notes">
                    📝 {location.notes}
                  </div>
                )}
                
                <div className="location-status" style={{ color: getStatusColor(location.status) }}>
                  {location.status === 'completed' && '✅ Completed'}
                  {location.status === 'in-progress' && '⏳ In Progress'}
                  {location.status === 'pending' && '⏰ Pending'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && selectedLocation.status === 'pending' && (
        <div className="action-panel">
          <button className="check-in-btn" onClick={handleCheckIn}>
            📍 Check In at {selectedLocation.name}
          </button>
        </div>
      )}

      <div className="itinerary-stats">
        <h3>Today's Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '50%' }}></div>
        </div>
        <p className="progress-text">2 of 4 locations completed</p>
      </div>
    </div>
  );
};

export default Itinerary;