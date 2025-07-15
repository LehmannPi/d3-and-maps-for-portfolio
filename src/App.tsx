import { useState } from 'react';
import { BarChart } from './components/charts';
import { GoogleMap, MockMap } from './components/maps';
import type { BarChartData } from './types/chart';
import type { MapMarker } from './types/map';
import './App.css';

function App() {
  const [selectedDataPoint, setSelectedDataPoint] = useState<string | null>(
    null
  );

  // Sample data for bar chart
  const barChartData: BarChartData[] = [
    { id: '1', value: 30, label: 'Category A', category: 'A' },
    { id: '2', value: 45, label: 'Category B', category: 'B' },
    { id: '3', value: 60, label: 'Category C', category: 'C' },
    { id: '4', value: 25, label: 'Category D', category: 'D' },
    { id: '5', value: 80, label: 'Category E', category: 'E' },
  ];

  // Sample markers for Google Maps
  const mapMarkers: MapMarker[] = [
    {
      id: '1',
      position: { lat: 40.7128, lng: -74.006 },
      title: 'New York',
      infoWindow: {
        content: 'New York City - The Big Apple',
        title: 'NYC',
      },
    },
    {
      id: '2',
      position: { lat: 34.0522, lng: -118.2437 },
      title: 'Los Angeles',
      infoWindow: {
        content: 'Los Angeles - City of Angels',
        title: 'LA',
      },
    },
    {
      id: '3',
      position: { lat: 41.8781, lng: -87.6298 },
      title: 'Chicago',
      infoWindow: {
        content: 'Chicago - The Windy City',
        title: 'Chicago',
      },
    },
  ];

  const handleDataPointClick = (data: any) => {
    setSelectedDataPoint(data.label);
    console.log('Clicked data point:', data);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    console.log('Clicked marker:', marker);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>D3 Charts & Google Maps Portfolio</h1>
        <p>Reusable components for module federation</p>
      </header>

      <main className="app-main">
        <section className="chart-section">
          <h2>D3 Bar Chart</h2>
          <div className="chart-container">
            <BarChart
              data={barChartData}
              config={{
                width: 600,
                height: 400,
                colors: ['#4299e1', '#48bb78', '#ed8936', '#f56565', '#9f7aea'],
              }}
              onDataPointClick={handleDataPointClick}
            />
          </div>
          {selectedDataPoint && (
            <p className="selected-info">Selected: {selectedDataPoint}</p>
          )}
        </section>

        <section className="map-section">
          <h2>Google Maps</h2>
          <div className="map-container">
            <MockMap
              config={{
                center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
                zoom: 4,
              }}
              className="w-full h-full text-black"
              markers={mapMarkers}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          <p className="map-note">
            Demo Mode: This is a mock map. For real Google Maps, set
            VITE_GOOGLE_MAPS_API_KEY in .env file
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
