import { Preferences } from '@capacitor/preferences';

export const setItem = async (key: string, value: string): Promise<void> => {
  await Preferences.set({ key, value });
};

export const getItem = async (key: string): Promise<string | null> => {
  const { value } = await Preferences.get({ key });
  return value;
};

export const removeItem = async (key: string): Promise<void> => {
  await Preferences.remove({ key });
};