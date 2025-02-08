import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { signOutUser } from "../../services/authService";

export default function ProfileScreen() {
  async function signOut() {
    try {
      await signOutUser();
    } catch (error) {
      Alert.alert("Sign Out", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text h4>Perfil</Text>
      <Button 
        title="Cerrar Sesión" 
        type="outline"
        onPress={signOut}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});