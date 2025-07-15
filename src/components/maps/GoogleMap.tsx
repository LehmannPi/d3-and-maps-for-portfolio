import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { MapProps } from '../../types/map';
import {
  getMapConfig,
  createMarker,
  createInfoWindow,
  createPolygon,
} from '../../utils/mapUtils';

export const GoogleMap: React.FC<MapProps> = ({
  config,
  markers = [],
  polygons = [],
  className = '',
  onMarkerClick,
  onMapClick,
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [_map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // You'll need to provide your Google Maps API key
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    console.log('Google Maps API Key:', apiKey ? 'Present' : 'Missing');

    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setError(
        'Google Maps API key is required. Please set VITE_GOOGLE_MAPS_API_KEY environment variable in a .env file.'
      );
      setIsLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        if (!mapRef.current) return;

        const mapConfig = getMapConfig(config);
        const googleMap = new google.maps.Map(mapRef.current, {
          center: mapConfig.center,
          zoom: mapConfig.zoom,
          mapTypeId: mapConfig.mapTypeId as google.maps.MapTypeId,
          ...(mapConfig.styles && { styles: mapConfig.styles }),
        });

        setMap(googleMap);
        onMapLoad?.(googleMap);
        setIsLoading(false);

        // Add markers
        markers.forEach((markerData) => {
          const marker = createMarker(markerData.position, {
            map: googleMap,
            title: markerData.title,
            icon: markerData.icon,
          });

          if (markerData.infoWindow) {
            const infoWindow = createInfoWindow(markerData.infoWindow.content);

            marker.addListener('click', () => {
              infoWindow.open(googleMap, marker);
              onMarkerClick?.(markerData);
            });
          } else {
            marker.addListener('click', () => {
              onMarkerClick?.(markerData);
            });
          }
        });

        // Add polygons
        polygons.forEach((polygonData) => {
          createPolygon(polygonData.paths, {
            map: googleMap,
            fillColor: polygonData.fillColor,
            fillOpacity: polygonData.fillOpacity,
            strokeColor: polygonData.strokeColor,
            strokeWeight: polygonData.strokeWeight,
          });
        });

        // Add map click listener
        if (onMapClick) {
          googleMap.addListener('click', onMapClick);
        }
      })
      .catch((err) => {
        setError(`Failed to load Google Maps: ${err.message}`);
        setIsLoading(false);
      });
  }, [config, markers, polygons, onMarkerClick, onMapClick, onMapLoad]);

  if (error) {
    return (
      <div
        className={`google-map-error ${className} p-4 bg-red-100 border border-red-400 rounded`}
      >
        <p className="text-red-700 font-semibold">Error: {error}</p>
        <p className="text-red-600 text-sm mt-2">
          To fix this, create a .env file in the project root with:
          <br />
          <code className="bg-gray-200 px-2 py-1 rounded">
            VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key
          </code>
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`google-map-loading ${className} p-4 bg-blue-100 border border-blue-400 rounded`}
      >
        <p className="text-blue-700 font-semibold">Loading Google Maps...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`google-map ${className}`}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
