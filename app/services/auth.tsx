import { saveToken } from './authStorage';

export const login = async (username: string, password: string): Promise<boolean> => {
    const response = await fetch('http://10.0.2.2:5000/api/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email: username, password: password }),
    });

    if (response.status === 401) {
      throw new Error('Invalid username or password');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Login failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Login failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const userId: number = await response.json();

    // Store token securely
    await saveToken(userId.toString());
    return true;
};