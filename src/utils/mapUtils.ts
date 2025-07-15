import { Loader } from '@googlemaps/js-api-loader';
import type { MapConfig } from '../types/map';

export const defaultMapConfig: MapConfig = {
  center: { lat: 40.7128, lng: -74.006 }, // New York
  zoom: 10,
  mapTypeId: 'roadmap',
};

export const createMapLoader = (apiKey: string) => {
  return new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places'],
  });
};

export const getMapConfig = (config: Partial<MapConfig> = {}) => {
  return { ...defaultMapConfig, ...config };
};

export const createMarker = (
  position: { lat: number; lng: number },
  options: any = {}
): any => {
  return new google.maps.Marker({
    position,
    ...options,
  });
};

export const createInfoWindow = (content: string, options: any = {}): any => {
  return new google.maps.InfoWindow({
    content,
    ...options,
  });
};

export const createPolygon = (
  paths: Array<{ lat: number; lng: number }>,
  options: any = {}
): any => {
  return new google.maps.Polygon({
    paths,
    ...options,
  });
};
