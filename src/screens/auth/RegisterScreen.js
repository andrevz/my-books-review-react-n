import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import * as authService from "../../services/authService";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function registerUser() {
    try {
      await authService.registerUser(email.trim(), password.trim());
    } catch (error) {
      Alert.alert("Register Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input 
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(value) => setEmail(value)} />
      <Input 
        placeholder="Contraseña"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry />
      <Input 
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry />
      <Button 
        title="Registrarse"
        containerStyle={styles.button}
        onPress={registerUser}/>
      <Button 
        title="¿Ya tienes cuenta? Inicia sesión" 
        type="clear"
        onPress={() => navigation.navigate('Login')}
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