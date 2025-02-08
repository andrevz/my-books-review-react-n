import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import * as authService from "../../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    try {
      await authService.signIn(email.trim(), password.trim());
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Iniciar Sesión</Text>
      <Input 
        placeholder="Email"
        autoCapitalize='none'
        value={email}
        onChangeText={(value) => setEmail(value)} />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry />
      <Button 
        title="Iniciar Sesión" 
        containerStyle={styles.button} 
        onPress={signIn} />
      <Button 
        title="¿No tienes cuenta? Regístrate" 
        type="clear"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});