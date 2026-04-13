declare module 'react-native-map-link' {
  interface ShowLocationOptions {
    latitude: number;
    longitude: number;
    sourceLatitude?: number;
    sourceLongitude?: number;
    title?: string;
    googleForceLatLon?: boolean;
    googlePlaceId?: string;
    alwaysIncludeGoogle?: boolean;
    dialogTitle?: string;
    dialogMessage?: string;
    cancelText?: string;
    appsWhiteList?: string[];
    app?: string;
    directionsMode?: 'car' | 'walk' | 'bicycle' | 'transit';
    namedQuery?: string;
  }

  export function showLocation(options: ShowLocationOptions): Promise<void>;
}
