import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export async function getUserProfile() {
  let userProfile = null;

  try {
    const docSnap = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
    if (docSnap.exists())
      userProfile = docSnap.data();
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't retrieve user profile, please try again later");
  }

  return userProfile;
}

export async function toggleUserProfileFavoriteBook(userProfile, book) {
  let favorites = userProfile.favorites || [];

  if (favorites.some(x => x.id === book.id))
    favorites = favorites.filter(x => x.id !== book.id);
  else
    favorites.push({ id: book.id, title: book.title, thumbnail: book.imageLinks.thumbnail });

  updateUserProfile({
    ...userProfile,
    favorites,
  });
}

export async function deleteBookReview(userProfile, bookId) {
  if (!userProfile.bookRatings ||
      !userProfile.bookRatings.some(r => r.bookId == bookId))
    return;

  await updateUserProfile({
    ...userProfile,
    bookRatings: userProfile.bookRatings.filter(r => r.bookId !== bookId)
  });
}

export async function saveBookReview(userProfile, rating, comment, bookId) {
  if (!userProfile || !bookId || !(rating || comment))
    return;

  const bookRatings = userProfile.bookRatings || [];
  const bookRating = bookRatings.find(r => r.bookId === bookId);
  if (!bookRating) {
    bookRatings.push({
      bookId,
      comment,
      rating
    });
  } else {
    bookRating.rating = rating || 0;
    bookRating.comment = comment || '';
  }

  await updateUserProfile({
    ...userProfile,
    bookRatings: [...bookRatings]
  });
}

export async function updateUserProfile(data) {
  try {
    await setDoc(doc(db, 'profiles', auth.currentUser.uid), data);
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't update user profile, please try again later");
  }
}