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
  
  // Default to Kajiado Town coordinates
  const defaultPosition: [number, number] = [-1.8527, 36.7816];
  
  const healthFacilities: HealthFacility[] = [
    {
      id: '1',
      name: 'Kajiado County Referral Hospital',
      type: 'hospital',
      position: [-1.8523, 36.7765],
      servicesAvailable: ['Emergency', 'Maternity', 'Pediatrics', 'Surgery', 'Outpatient', 'Laboratory'],
      distance: 0.5
    },
    {
      id: '2',
      name: 'Ongata Rongai Sub-County Hospital',
      type: 'hospital',
      position: [-1.3956, 36.7412],
      servicesAvailable: ['Emergency', 'Maternity', 'Pediatrics', 'Outpatient', 'X-Ray'],
      distance: 52.3
    },
    {
      id: '3',
      name: 'Ngong Sub-County Hospital',
      type: 'hospital',
      position: [-1.3535, 36.6639],
      servicesAvailable: ['Emergency', 'Maternity', 'Surgery', 'Laboratory', 'Pharmacy'],
      distance: 58.7
    },
    {
      id: '4',
      name: 'Kitengela Health Center',
      type: 'health-center',
      position: [-1.4744, 36.9556],
      servicesAvailable: ['Vaccination', 'Maternal Care', 'Outpatient', 'Family Planning'],
      distance: 42.1
    },
    {
      id: '5',
      name: 'Namanga Health Center',
      type: 'health-center',
      position: [-2.5466, 36.7827],
      servicesAvailable: ['Primary Care', 'Vaccination', 'Maternal Health', 'HIV Testing'],
      distance: 77.2
    },
    {
      id: '6',
      name: 'Bissil Health Center',
      type: 'clinic',
      position: [-1.8774, 36.8229],
      servicesAvailable: ['Primary Care', 'Vaccination', 'Family Planning'],
      distance: 5.8
    },
    {
      id: '7',
      name: 'Oloitokitok Sub-County Hospital',
      type: 'hospital',
      position: [-2.9561, 37.5269],
      servicesAvailable: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
      distance: 142.5
    },
    {
      id: '8',
      name: 'Kimana Health Center',
      type: 'clinic',
      position: [-2.7528, 37.4625],
      servicesAvailable: ['Primary Care', 'Maternal Health', 'Vaccination'],
      distance: 120.3
    }
  ];

  const chaLocations: CHALocation[] = [
    {
      id: '1',
      name: 'Mary Nkoyiai',
      position: [-1.8567, 36.7823],
      status: 'active',
      lastVisit: '2 hours ago'
    },
    {
      id: '2',
      name: 'Joseph Ole Sankale',
      position: [-1.8491, 36.7798],
      status: 'active',
      lastVisit: '30 minutes ago'
    },
    {
      id: '3',
      name: 'Grace Nasieku',
      position: [-1.8753, 36.8201],
      status: 'active',
      lastVisit: '1 hour ago'
    },
    {
      id: '4',
      name: 'David Lekishon',
      position: [-1.8612, 36.7756],
      status: 'inactive',
      lastVisit: 'Yesterday'
    },
    {
      id: '5',
      name: 'Sarah Entito',
      position: [-1.4798, 36.9523],
      status: 'active',
      lastVisit: '3 hours ago'
    },
    {
      id: '6',
      name: 'Peter Kisemei',
      position: [-2.5512, 36.7856],
      status: 'active',
      lastVisit: '4 hours ago'
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
        <p>Use the Kajiado County navigation for easier access to nearby facilities.</p>
      </div>
    </div>
  );
};

export default MapView;