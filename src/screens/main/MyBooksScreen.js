import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { BookList } from '../../components/BookList';
import { useUserProfile } from "../../hooks/useUserProfile";
import * as userProfileService from "../../services/userProfileService";
import { BookRating } from '../../components/BookRating';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from '@rneui/themed';

export default function MyBooksScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const {userProfile} = useUserProfile();

    const bottomSheetRef = useRef(null);

  if (!userProfile?.favorites?.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text h4 style={styles.emptyText}>Tu librería esta vacia</Text>
      </View>
    );
  }

  async function toggleFavoriteBook(bookId) {
    try {
      await userProfileService.toggleUserProfileFavoriteBook(userProfile, bookId);
    } catch (error) {
      Alert.alert("Libreria", error.message);
    }
  }

  function handleBookSelection(book) {
    setCurrentBook(book);

    const bookRating = userProfile.bookRatings?.find(r => r.bookId === book.id);
    if (bookRating) {
      setComment(bookRating.comment);
      setRating(bookRating.rating);
    } else {
      setComment('');
      setRating(0);
    }

    bottomSheetRef.current?.snapToIndex(1);
  }

  async function deleteUserReview() {
    bottomSheetRef.current?.close();

    try {
      await userProfileService.deleteBookReview(userProfile, currentBook.id);
    } catch (error) {
      Alert.alert("Libreria", error.message);
    }
  }

  async function saveUserReview() {
    bottomSheetRef.current?.close();

    try {
      await userProfileService.saveBookReview(userProfile, rating, comment, currentBook.id);
    } catch (error) {
      Alert.alert("Libreria", error.message);
    }
  }

  const userProfileFavorites = userProfile?.favorites || [];

  return (
    <GestureHandlerRootView style={styles.container}>
      <BookList 
        books={userProfileFavorites}
        favorites={userProfileFavorites}
        toggleFavoriteBook={toggleFavoriteBook}
        onBookSelected={handleBookSelection}
      />
      <BookRating
        bookTitle={currentBook?.title}
        bottomSheetRef={bottomSheetRef}
        comment={comment}
        rating={rating}
        setComment={setComment}
        setRating={setRating}
        saveReview={saveUserReview}
        removeReview={deleteUserReview}
      />
    </GestureHandlerRootView>
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
  emptyText: {
    textAlign: 'center'
  }
});