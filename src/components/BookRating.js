import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, Input, Text } from "@rneui/themed";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";

export function BookRating({
  bookTitle,
  bottomSheetRef,
  comment,
  rating,
  setComment,
  setRating,
  saveReview,
  removeReview,
}) {
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  return (
    <BottomSheet
      enablePanDownToClose={true}
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <Text h4 style={styles.bottomSheetTitle}>
          {bookTitle}
        </Text>
        <StarRating
          onChange={setRating}
          rating={rating}
          style={styles.bottomSheetRating}
        />
        <Input
          onChangeText={setComment}
          placeholder="Escribe un comentario"
          style={styles.bottomSheetComment}
          value={comment}
        />
        <Button
          onPress={saveReview}
          style={styles.bottomSheetAction}
          title="Guardar"
        />
        <Button
          onPress={removeReview}
          style={styles.bottomSheetAction}
          title="Eliminar Reseña"
          type="clear"
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: 16,
  },
  bottomSheetTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  bottomSheetComment: {
    marginTop: 8,
  },
  bottomSheetAction: {
    marginTop: 8,
  },
  bottomSheetRating: {
    alignSelf: "center",
  },
});
