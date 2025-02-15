import React, { useRef, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { BookList } from '../../components/BookList';
import { useBooksData } from '../../hooks/useBooksData';
import { useUserProfile } from "../../hooks/useUserProfile";
import * as userProfileService from "../../services/userProfileService";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookRating } from '../../components/BookRating';

export default function LibraryScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const {apiError, loading, books} = useBooksData("");
  const {userProfile} = useUserProfile();

  const bottomSheetRef = useRef(null);

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

  async function toggleFavoriteBook(book) {
    try {
      await userProfileService.toggleUserProfileFavoriteBook(userProfile, book);
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
        books={books}
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
});