import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { BookList } from '../../components/BookList';
import { useBooksData } from '../../hooks/useBooksData';
import { useUserProfile } from "../../hooks/useUserProfile";
import * as userProfileService from "../../services/userProfileService";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Input, Text } from '@rneui/themed';
import StarRating from 'react-native-star-rating-widget';

export default function LibraryScreen() {
  const [currentBook, setCurrentBook] = useState(null);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const {apiError, loading, books} = useBooksData("");
  const {userProfile} = useUserProfile();

  const snapPoints = useMemo(() => ['50%', '75%'], []);
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
        books={books}
        favorites={userProfileFavorites}
        toggleFavoriteBook={toggleFavoriteBook}
        onBookSelected={handleBookSelection}/>
      <BottomSheet
        ref={bottomSheetRef} 
        snapPoints={snapPoints} 
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <Text h4 style={styles.bottomSheetTitle}>{currentBook?.title}</Text>
          <StarRating 
            rating={rating} 
            onChange={setRating}
            style={styles.bottomSheetRating}/>
          <Input
            placeholder='Escribe un comentario'
            value={comment}
            onChangeText={setComment}
            style={styles.bottomSheetComment}/>
          <Button
            title='Guardar'
            onPress={saveUserReview}
            style={styles.bottomSheetAction}/>
          <Button
            title='Eliminar Reseña'
            type='clear'
            onPress={deleteUserReview}
            style={styles.bottomSheetAction}/>
        </BottomSheetView>
      </BottomSheet>
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
  bottomSheetContainer: {
    padding: 16,
  },
  bottomSheetTitle: {
    textAlign: 'center',
    marginBottom: 16
  },
  bottomSheetComment: {
    marginTop: 8,
  },
  bottomSheetAction: {
    marginTop: 8,
  },
  bottomSheetRating: {
    alignSelf: 'center'
  }
});