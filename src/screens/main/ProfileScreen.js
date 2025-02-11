import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View, StyleSheet } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import * as authService from "../../services/authService";
import * as userProfileService from "../../services/userProfileService";

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    loadUserProfile();
  }, []);

  async function loadUserProfile() {
    setLoading(true);

    try {
      const profile = await userProfileService.getUserProfile();
      if (profile) {
        setUserProfile(profile);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
      }
    } catch (error) {
      Alert.alert("Profile", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser() {
    setLoading(true);

    try {
      await userProfileService.updateUserProfile({
        ...userProfile,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      });
    } catch (error) {
      Alert.alert("Profile", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);

    try {
      await authService.signOutUser();
    } catch (error) {
      Alert.alert("Profile", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Datos Personales</Text>
      <Input
        placeholder='Nombre'
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        placeholder='Apellido'
        value={lastName}
        onChangeText={setLastName}
      />
      <Button
        title='Actualizar'
        onPress={updateUser}
        containerStyle={styles.button}
      />
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
    margin: 16,
  },
  button: {
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
});