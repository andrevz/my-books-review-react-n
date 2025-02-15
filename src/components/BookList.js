import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from '@rneui/themed';

export function BookList({books, favorites, toggleFavoriteBook, onBookSelected}) {
  const renderItem = ({item}) => {
    return (
      <Card key={item.id} containerStyle={styles.card}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Image
          style={styles.cardImage}
          onPress={() => onBookSelected && onBookSelected(item)}
          source={{uri: item.thumbnail || item.imageLinks.thumbnail}}/>
        <View style={styles.cardFooter}>
          { favorites?.some(x => x.id === item.id)
            ? <Icon name='bookmark' size={28} onPress={() => toggleFavoriteBook(item)}/>
            : <Icon name='bookmark-o' size={28} onPress={() => toggleFavoriteBook(item)}/>
          }     
        </View>
      </Card>
    );
  };

  return (
    <FlatList
      numColumns={2}
      horizontal={false}
      style={styles.booksContainer}
      columnWrapperStyle={styles.row}
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}/>
  );
}

const styles = StyleSheet.create({
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
  },
});