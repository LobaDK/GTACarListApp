import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './context/authContext';
import { login } from './services/auth';

const LoginScreen = () => {
  const { refreshAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const IsLoggedIn = await login(username, password);
      if (IsLoggedIn) {
        await refreshAuth();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = () => {
    return "Registering is currently not implemented.";
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={50} color="#000" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#000"
        />
        {username ? (
          <TouchableOpacity onPress={() => setUsername('')} style={styles.clearIcon}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#000"
          secureTextEntry
        />
        {password ? (
          <TouchableOpacity onPress={() => setPassword('')} style={styles.clearIcon}>
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
});

export default LoginScreen;
