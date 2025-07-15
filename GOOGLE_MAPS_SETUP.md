# Google Maps API Setup

## Current Status

The application is currently running in **Demo Mode** with a mock map component. This allows you to see the functionality without requiring an API key.

## To Enable Real Google Maps

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Go to **Credentials** and create an **API Key**
5. (Optional) Restrict the API key to your domain for security

### 2. Add the API Key to Your Project

Create a `.env` file in the project root with:

```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Switch to Real Google Maps

In `src/App.tsx`, change:

```tsx
import { MockMap } from './components/maps';
// to:
import { GoogleMap } from './components/maps';

// And change:
<MockMap ... />
// to:
<GoogleMap ... />
```

## Demo Mode Features

- Interactive mock map with grid pattern
- Clickable markers with hover effects
- Responsive design
- Shows map coordinates and zoom level
- All the same props and callbacks as the real GoogleMap component

## Benefits of Demo Mode

- No API key required
- No usage costs
- Perfect for development and testing
- Shows the component structure and interactions
- Works offline
