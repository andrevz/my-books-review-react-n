import React from 'react';
import { ActivityIndicator, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Card } from '@rneui/themed';
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
      <Card containerStyle={styles.card}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Image
          style={styles.cardImage}
          source={{uri: item.imageLinks.thumbnail}}/>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        horizontal={false}
        style={styles.booksContainer}
        columnWrapperStyle={styles.row}
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  booksContainer: {
    paddingTop: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    maxWidth: '48%',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    margin: 0,
    borderRadius: 8
  },
  cardImage: {
    resizeMode: 'stretch',
  },
});