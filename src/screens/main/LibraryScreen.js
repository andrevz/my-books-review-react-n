import React from 'react';
import { ActivityIndicator, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Card, Text } from '@rneui/themed';
import { useBooksData } from '../../hooks/useBooksData';

export default function LibraryScreen() {
  const {apiError, loading, books} = useBooksData("");

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (apiError) {
    Alert.alert("Libreria", apiError);
  }

  const renderItem = ({item}) => {
    return (
      <Card>
        <Card.Title>{item.title}</Card.Title>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
});