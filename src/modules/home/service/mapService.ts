import { Platform } from 'react-native';
import { showLocation } from 'react-native-map-link';
import { Address } from '../model/Address';

const buildAddressTitle = (address: Address): string => {
  const parts = [
    address.logradouro,
    address.bairro,
    address.localidade,
    address.uf,
    address.cep,
  ].filter(Boolean);
  return parts.join(', ');
};

const openAddressInMapsWeb = (address: Address): void => {
  const query = encodeURIComponent(buildAddressTitle(address));
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, '_blank');
};

/**
 * Opens the map application to display the given address.
 *
 * On web: opens Google Maps in a new browser tab using a search URL.
 * On mobile: opens the device's native map app via react-native-map-link.
 *
 * Note: ViaCEP returns text-based data only (no coordinates).
 * We use googleForceLatLon: false so Google Maps performs a search
 * by the address title instead of using raw coordinates.
 *
 * In production, integrate a Geocoding API to obtain real lat/lon.
 */
export const openAddressInMaps = async (address: Address): Promise<void> => {
  if (Platform.OS === 'web') {
    openAddressInMapsWeb(address);
    return;
  }

  const title = buildAddressTitle(address);
  await showLocation({
    latitude: 0,
    longitude: 0,
    title,
    googleForceLatLon: false,
    alwaysIncludeGoogle: true,
    dialogTitle: 'Abrir endereço no mapa',
    dialogMessage: 'Escolha um aplicativo de mapas',
    cancelText: 'Cancelar',
  });
};
