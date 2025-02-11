import React from 'react';
import { ActivityIndicator, View, StyleSheet, Alert, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from '@rneui/themed';
import { useBooksData } from '../../hooks/useBooksData';
import { useUserProfile } from "../../hooks/useUserProfile";
import * as userProfileService from "../../services/userProfileService";

export default function LibraryScreen() {
  const {apiError, loading, books} = useBooksData("");
  const {userProfile} = useUserProfile();

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

  async function toggleFavoriteBook(bookId) {
    try {
      await userProfileService.toggleUserProfileFavoriteBook(userProfile, bookId);
    } catch (error) {
      Alert.alert("Libreria", error.message);
    }
  }

  function isFavorite(bookId) {
    return userProfile ? userProfile.favorites?.some(x => x === bookId) : false;
  }

  const renderItem = ({item}) => {
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Image
          style={styles.cardImage}
          source={{uri: item.imageLinks.thumbnail}}/>
        <View style={styles.cardFooter}>
          { isFavorite(item.id)
            ? <Icon name='bookmark' size={20} onPress={() => toggleFavoriteBook(item.id)}/>
            : <Icon name='bookmark-o' size={20} onPress={() => toggleFavoriteBook(item.id)}/>
          }     
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    paddingBottom: 16
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
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  }
});