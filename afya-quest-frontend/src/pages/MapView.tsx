import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapView.css';

// Fix for default markers in react-leaflet
// This is a workaround for the default marker icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface HealthFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'health-center';
  position: [number, number];
  servicesAvailable: string[];
  distance?: number;
}

interface CHALocation {
  id: string;
  name: string;
  position: [number, number];
  status: 'active' | 'inactive';
  lastVisit?: string;
}

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedView, setSelectedView] = useState<'facilities' | 'chas'>('facilities');
  
  // Default to Nairobi coordinates
  const defaultPosition: [number, number] = [-1.286389, 36.817223];
  
  const healthFacilities: HealthFacility[] = [
    {
      id: '1',
      name: 'Kenyatta National Hospital',
      type: 'hospital',
      position: [-1.3018, 36.8065],
      servicesAvailable: ['Emergency', 'Maternity', 'Pediatrics', 'Surgery'],
      distance: 5.2
    },
    {
      id: '2',
      name: 'Kibera Health Center',
      type: 'health-center',
      position: [-1.3125, 36.7880],
      servicesAvailable: ['Vaccination', 'Maternal Care', 'Outpatient'],
      distance: 3.1
    },
    {
      id: '3',
      name: 'Mathare North Health Centre',
      type: 'clinic',
      position: [-1.2621, 36.8580],
      servicesAvailable: ['Primary Care', 'Vaccination', 'Family Planning'],
      distance: 7.8
    }
  ];

  const chaLocations: CHALocation[] = [
    {
      id: '1',
      name: 'Mary Wanjiru',
      position: [-1.2921, 36.8219],
      status: 'active',
      lastVisit: '2 hours ago'
    },
    {
      id: '2',
      name: 'John Kamau',
      position: [-1.3031, 36.8156],
      status: 'active',
      lastVisit: '30 minutes ago'
    },
    {
      id: '3',
      name: 'Grace Achieng',
      position: [-1.2750, 36.8300],
      status: 'inactive',
      lastVisit: 'Yesterday'
    }
  ];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
          setUserLocation(defaultPosition);
        }
      );
    } else {
      setUserLocation(defaultPosition);
    }
  }, []);

  const getMarkerIcon = (type: string) => {
    const iconHtml = type === 'hospital' ? '🏥' : type === 'clinic' ? '🏩' : '🏨';
    return L.divIcon({
      html: `<div style="font-size: 24px;">${iconHtml}</div>`,
      iconSize: [30, 30],
      className: 'custom-div-icon'
    });
  };

  const getCHAIcon = (status: string) => {
    const color = status === 'active' ? '#4CAF50' : '#9E9E9E';
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      className: 'cha-marker'
    });
  };

  const mapCenter = userLocation || defaultPosition;

  return (
    <div className="map-view">
      <header className="map-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>Map-Based UI</h1>
        <div className="view-toggle">
          <button
            className={selectedView === 'facilities' ? 'active' : ''}
            onClick={() => setSelectedView('facilities')}
          >
            Facilities
          </button>
          <button
            className={selectedView === 'chas' ? 'active' : ''}
            onClick={() => setSelectedView('chas')}
          >
            CHAs
          </button>
        </div>
      </header>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User location marker */}
          {userLocation && (
            <>
              <Marker position={userLocation}>
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </Marker>
              <Circle
                center={userLocation}
                radius={500}
                pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 0.2 }}
              />
            </>
          )}
          
          {/* Health Facilities */}
          {selectedView === 'facilities' && healthFacilities.map(facility => (
            <Marker
              key={facility.id}
              position={facility.position}
              icon={getMarkerIcon(facility.type)}
            >
              <Popup>
                <div className="facility-popup">
                  <h3>{facility.name}</h3>
                  <p>Type: {facility.type}</p>
                  <p>Distance: {facility.distance} km</p>
                  <div className="services">
                    <strong>Services:</strong>
                    <ul>
                      {facility.servicesAvailable.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* CHA Locations */}
          {selectedView === 'chas' && chaLocations.map(cha => (
            <Marker
              key={cha.id}
              position={cha.position}
              icon={getCHAIcon(cha.status)}
            >
              <Popup>
                <div className="cha-popup">
                  <h4>{cha.name}</h4>
                  <p>Status: <span className={cha.status}>{cha.status}</span></p>
                  <p>Last Visit: {cha.lastVisit}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-legend">
        <h3>Legend</h3>
        {selectedView === 'facilities' ? (
          <div className="legend-items">
            <div className="legend-item">
              <span>🏥</span> Hospital
            </div>
            <div className="legend-item">
              <span>🏩</span> Clinic
            </div>
            <div className="legend-item">
              <span>🏨</span> Health Center
            </div>
            <div className="legend-item">
              <span style={{ color: 'blue' }}>●</span> Your Location
            </div>
          </div>
        ) : (
          <div className="legend-items">
            <div className="legend-item">
              <span style={{ color: '#4CAF50' }}>●</span> Active CHA
            </div>
            <div className="legend-item">
              <span style={{ color: '#9E9E9E' }}>●</span> Inactive CHA
            </div>
          </div>
        )}
      </div>

      <div className="location-stats">
        <h3>Location Statistics</h3>
        {selectedView === 'facilities' ? (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{healthFacilities.length}</span>
              <span className="stat-label">Nearby Facilities</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">3.7 km</span>
              <span className="stat-label">Avg. Distance</span>
            </div>
          </div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{chaLocations.filter(c => c.status === 'active').length}</span>
              <span className="stat-label">Active CHAs</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{chaLocations.length}</span>
              <span className="stat-label">Total CHAs</span>
            </div>
          </div>
        )}
      </div>

      <div className="navigation-info">
        <h3>Quick Navigation</h3>
        <p>Tap on any marker to view details and get directions.</p>
        <p>Use the Kabale region navigation for easier access to nearby facilities.</p>
      </div>
    </div>
  );
};

export default MapView;