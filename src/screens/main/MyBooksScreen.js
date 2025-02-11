import React from 'react';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { BookList } from '../../components/BookList';
import { useBooksData } from '../../hooks/useBooksData';
import { useUserProfile } from "../../hooks/useUserProfile";
import * as userProfileService from "../../services/userProfileService";

export default function MyBooksScreen() {
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

  const userProfileFavorites = userProfile?.favorites || [];
  const favoriteBooks = books.filter(x => userProfileFavorites?.some(f => f === x.id));

  return (
    <View style={styles.container}>
      <BookList 
        books={favoriteBooks}
        favorites={userProfileFavorites}
        toggleFavoriteBook={toggleFavoriteBook}/>
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
});