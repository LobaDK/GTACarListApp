import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './context/authContext';
import { login } from './services/auth';

const LoginScreen = () => {
  const { refreshAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const IsLoggedIn = await login(username, password);
      if (IsLoggedIn) {
        await refreshAuth();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (error) {
      setError(''); // Clear error when user starts typing
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (error) {
      setError(''); // Clear error when user starts typing
    }
  };

  const handleRegister = () => {
    setError('Registration is not implemented yet.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={50} color="#000" />
      </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
          style={styles.input}
          placeholderTextColor="#000"
        />
        {username ? (
          <TouchableOpacity onPress={() => handleUsernameChange('')} style={styles.clearIcon}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          style={styles.input}
          placeholderTextColor="#000"
          secureTextEntry
        />
        {password ? (
          <TouchableOpacity onPress={() => handlePasswordChange('')} style={styles.clearIcon}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3446A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCD6E1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '70%',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  clearIcon: {
    paddingLeft: 5,
  },
  button: {
    backgroundColor: '#685B8F',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
