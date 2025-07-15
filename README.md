# D3 Charts & Google Maps Portfolio

A collection of reusable D3 charts and Google Maps components designed for module federation. This project provides ready-to-use visualization components that can be easily integrated into other applications.

## Features

- **D3 Charts**: Interactive bar charts with animations and click handlers
- **Google Maps**: Customizable maps with markers, info windows, and polygons
- **TypeScript**: Full type safety with comprehensive interfaces
- **Module Federation Ready**: Components designed for easy sharing
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js
- Google Maps API key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd g3-and-maps-for-portfolio
```

2. Install dependencies:

```bash
bun install
```

3. Set up your Google Maps API key:

```bash
# Create a .env file
echo "VITE_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env
```

4. Start the development server:

```bash
bun run dev
```

## Components

### D3 Charts

#### BarChart

A responsive bar chart component with animations and interactive features.

```tsx
import { BarChart } from './components/charts';
import type { BarChartData } from './types/chart';

const data: BarChartData[] = [
  { id: '1', value: 30, label: 'Category A', category: 'A' },
  { id: '2', value: 45, label: 'Category B', category: 'B' },
  // ... more data
];

<BarChart
  data={data}
  config={{
    width: 600,
    height: 400,
    colors: ['#4299e1', '#48bb78', '#ed8936'],
  }}
  onDataPointClick={(data) => console.log('Clicked:', data)}
/>;
```

### Google Maps

#### GoogleMap

A customizable Google Maps component with markers and polygons.

```tsx
import { GoogleMap } from './components/maps';
import type { MapMarker } from './types/map';

const markers: MapMarker[] = [
  {
    id: '1',
    position: { lat: 40.7128, lng: -74.006 },
    title: 'New York',
    infoWindow: {
      content: 'New York City - The Big Apple',
    },
  },
];

<GoogleMap
  config={{
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
  }}
  markers={markers}
  onMarkerClick={(marker) => console.log('Marker clicked:', marker)}
/>;
```

## Type Definitions

### Chart Types

```typescript
interface ChartData {
  id: string;
  value: number;
  label: string;
  color?: string;
}

interface BarChartData extends ChartData {
  category: string;
}

interface ChartConfig {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  animate?: boolean;
}
```

### Map Types

```typescript
interface MapConfig {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId?: google.maps.MapTypeId;
  styles?: google.maps.MapTypeStyle[];
}

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  icon?: string | google.maps.Icon;
  infoWindow?: { content: string; title?: string };
}
```

## Module Federation Setup

To use these components in a module federation setup:

1. **Host Application Configuration**:

```javascript
// webpack.config.js (host)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        chartsAndMaps: 'chartsAndMaps@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};
```

2. **Remote Application Configuration** (this project):

```javascript
// webpack.config.js (remote)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'chartsAndMaps',
      filename: 'remoteEntry.js',
      exposes: {
        './BarChart': './src/components/charts/BarChart',
        './GoogleMap': './src/components/maps/GoogleMap',
        './types': './src/types',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        d3: { singleton: true },
      },
    }),
  ],
};
```

3. **Usage in Host Application**:

```tsx
import React, { Suspense } from 'react';

const BarChart = React.lazy(() => import('chartsAndMaps/BarChart'));
const GoogleMap = React.lazy(() => import('chartsAndMaps/GoogleMap'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <BarChart data={chartData} />
      <GoogleMap markers={mapMarkers} />
    </Suspense>
  );
}
```

## Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BarChart.tsx
│   │   └── index.ts
│   ├── maps/
│   │   ├── GoogleMap.tsx
│   │   └── index.ts
│   └── index.ts
├── types/
│   ├── chart.ts
│   └── map.ts
├── utils/
│   ├── chartUtils.ts
│   └── mapUtils.ts
└── App.tsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open an issue on GitHub.
