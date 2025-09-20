import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/MapView.css';
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

interface ClientHouse {
  id: string;
  address: string;
  clientName: string;
  position: [number, number];
  status: 'to-visit' | 'visited' | 'scheduled';
  lastVisit?: string;
  nextVisit?: string;
  distance?: number;
  description?: string;
}

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedView, setSelectedView] = useState<'facilities' | 'clients'>('facilities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'to-visit' | 'visited' | 'scheduled'>('all');
  
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

  const clientHouses: ClientHouse[] = [
    {
      id: '1',
      address: '123 Savannah Road',
      clientName: 'Amboseli Village, Kajiado County, Kenya',
      position: [-1.8567, 36.7823],
      status: 'to-visit',
      distance: 1.2,
      description: 'Maternal health check-up needed'
    },
    {
      id: '2',
      address: '45 Elephant Trail',
      clientName: 'Oloitokitok, Kajiado County, Kenya', 
      position: [-1.8491, 36.7798],
      status: 'to-visit',
      distance: 1.9,
      description: 'Child vaccination due'
    },
    {
      id: '3',
      address: '78 Acacia Drive',
      clientName: 'Grace Nasieku',
      position: [-1.8753, 36.8201],
      status: 'visited',
      lastVisit: '2 days ago',
      distance: 2.3,
      description: 'Follow-up completed'
    },
    {
      id: '4',
      address: '22 Baobab Street',
      clientName: 'David Lekishon Family',
      position: [-1.8612, 36.7756],
      status: 'scheduled',
      nextVisit: 'Tomorrow 10:00 AM',
      distance: 0.8,
      description: 'Family planning consultation'
    },
    {
      id: '5',
      address: '56 Mara Road',
      clientName: 'Sarah Entito',
      position: [-1.4798, 36.9523],
      status: 'visited',
      lastVisit: '1 week ago',
      distance: 42.1,
      description: 'Diabetes monitoring completed'
    },
    {
      id: '6',
      address: '89 Kilimanjaro View',
      clientName: 'Peter Kisemei Household',
      position: [-2.5512, 36.7856],
      status: 'to-visit',
      distance: 77.2,
      description: 'Hypertension screening needed'
    },
    {
      id: '7',
      address: '34 Simba Lane',
      clientName: 'Mary Ole Sankale',
      position: [-1.8523, 36.7665],
      status: 'scheduled',
      nextVisit: 'Friday 2:00 PM',
      distance: 1.1,
      description: 'Prenatal care appointment'
    },
    {
      id: '8',
      address: '67 Zebra Close',
      clientName: 'Joseph Mutua Family',
      position: [-1.8734, 36.8123],
      status: 'visited',
      lastVisit: '3 days ago',
      distance: 3.2,
      description: 'Health education session completed'
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

  const getClientIcon = (status: string) => {
    let color = '#F44336'; // Red for to-visit
    if (status === 'visited') color = '#4CAF50'; // Green for visited
    if (status === 'scheduled') color = '#2196F3'; // Blue for scheduled
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      className: 'client-marker'
    });
  };

  const filteredClients = clientHouses.filter(client => {
    const matchesSearch = client.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const mapCenter = userLocation || defaultPosition;

  return (
    <div className="map-view">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Find CHC Locations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${statusFilter === 'to-visit' ? 'active' : ''}`}
          onClick={() => setStatusFilter('to-visit')}
        >
          <span className="bell-icon">🔔</span>
          To Visit
        </button>
        <button
          className={`filter-btn ${statusFilter === 'visited' ? 'active' : ''}`}
          onClick={() => setStatusFilter('visited')}
        >
          <span className="check-icon">✓</span>
          Visited
        </button>
        <button
          className={`filter-btn ${statusFilter === 'scheduled' ? 'active' : ''}`}
          onClick={() => setStatusFilter('scheduled')}
        >
          <span className="calendar-icon">📅</span>
          Scheduled
        </button>
      </div>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
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
          
          {/* Health Facilities - Always Show */}
          {healthFacilities.map(facility => (
            <Marker
              key={`facility-${facility.id}`}
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
          
          {/* Client Houses */}
          {filteredClients.map(client => (
            <Marker
              key={client.id}
              position={client.position}
              icon={getClientIcon(client.status)}
            >
              <Popup>
                <div className="client-popup">
                  <h4>{client.address}</h4>
                  <p><strong>{client.clientName}</strong></p>
                  <p>Status: <span className={`status-${client.status}`}>{client.status.replace('-', ' ').toUpperCase()}</span></p>
                  <p>Distance: {client.distance} miles</p>
                  {client.lastVisit && <p>Last Visit: {client.lastVisit}</p>}
                  {client.nextVisit && <p>Next Visit: {client.nextVisit}</p>}
                  {client.description && <p>Note: {client.description}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Map Controls */}
        <div className="map-controls">
          <button className="control-btn layers-btn">📐</button>
          <button className="control-btn location-btn">📍</button>
        </div>
      </div>

      {/* Map Legend */}
      <div className="map-legend">
        <h3>Map Legend</h3>
        <div className="legend-sections">
          <div className="legend-section">
            <h4>Health Facilities</h4>
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
            </div>
          </div>
          <div className="legend-section">
            <h4>Client Visits</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-dot red"></span> To Visit
              </div>
              <div className="legend-item">
                <span className="legend-dot blue"></span> Scheduled
              </div>
              <div className="legend-item">
                <span className="legend-dot green"></span> Visited
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="client-list">
        {filteredClients.slice(0, 2).map(client => (
          <div key={client.id} className="client-item">
            <div className="client-icon">
              <span className={`status-dot status-${client.status}`}></span>
            </div>
            <div className="client-info">
              <h4>{client.address}</h4>
              <p>{client.clientName}</p>
            </div>
            <div className="client-distance">
              <span className="distance-icon">📍</span>
              <span className="distance-text">{client.distance} miles</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MapView;