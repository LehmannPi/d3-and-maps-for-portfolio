import React from 'react';
import type { MapProps } from '../../types/map';

export const MockMap: React.FC<MapProps> = ({
  config,
  markers = [],
  className = '',
  onMarkerClick,
}) => {
  const center = config?.center || { lat: 40.7128, lng: -74.006 };
  const zoom = config?.zoom || 10;

  return (
    <div
      className={`mock-map ${className} bg-gray-200 border-2 border-gray-400 rounded-lg relative overflow-hidden`}
      style={{ width: '100%', height: '400px' }}
    >
      {/* Map background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      {/* Center indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="text-xs text-gray-600 mt-1 text-center">Center</div>
      </div>

      {/* Markers */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:bg-blue-600 transition-colors"
          style={{
            left: `${50 + (marker.position.lng - center.lng) * 100}%`,
            top: `${50 - (marker.position.lat - center.lat) * 100}%`,
          }}
          onClick={() => onMarkerClick?.(marker)}
          title={marker.title}
        >
          <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
            {marker.id}
          </div>
        </div>
      ))}

      {/* Map info overlay */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
        <div className="text-sm font-semibold text-gray-800">
          Mock Google Map
        </div>
        <div className="text-xs text-gray-600">
          Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </div>
        <div className="text-xs text-gray-600">
          Zoom: {zoom} | Markers: {markers.length}
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        Demo Mode
      </div>
    </div>
  );
};
