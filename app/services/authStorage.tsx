import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'GTACarListApp_token';

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
