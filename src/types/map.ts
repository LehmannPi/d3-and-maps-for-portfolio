export interface MapConfig {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mapTypeId?: string;
  styles?: any[];
}

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title?: string;
  icon?: string | any;
  infoWindow?: {
    content: string;
    title?: string;
  };
}

export interface MapPolygon {
  id: string;
  paths: Array<{ lat: number; lng: number }>;
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWeight?: number;
  title?: string;
}

export interface MapProps {
  config?: Partial<MapConfig>;
  markers?: MapMarker[];
  polygons?: MapPolygon[];
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (event: any) => void;
  onMapLoad?: (map: any) => void;
}
