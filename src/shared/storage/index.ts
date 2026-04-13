import AsyncStorage from '@react-native-async-storage/async-storage';
import { Address } from '../../modules/home/model/Address';

const HISTORY_KEY = '@fastlocation:history';
const LAST_ADDRESS_KEY = '@fastlocation:last_address';
const MAX_HISTORY_ITEMS = 20;

export const saveAddressToHistory = async (address: Address): Promise<void> => {
  try {
    const history = await getHistory();
    const filtered = history.filter((item) => item.cep !== address.cep);
    const updated = [address, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving address to history:', error);
  }
};

export const getHistory = async (): Promise<Address[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? (JSON.parse(data) as Address[]) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

export const saveLastAddress = async (address: Address): Promise<void> => {
  try {
    await AsyncStorage.setItem(LAST_ADDRESS_KEY, JSON.stringify(address));
  } catch (error) {
    console.error('Error saving last address:', error);
  }
};

export const getLastAddress = async (): Promise<Address | null> => {
  try {
    const data = await AsyncStorage.getItem(LAST_ADDRESS_KEY);
    return data ? (JSON.parse(data) as Address) : null;
  } catch (error) {
    console.error('Error getting last address:', error);
    return null;
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
    await AsyncStorage.removeItem(LAST_ADDRESS_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};
