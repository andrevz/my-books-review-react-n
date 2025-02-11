import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from '@rneui/themed';

export function BookList({books, favorites, toggleFavoriteBook}) {
  const renderItem = ({item}) => {
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Image
          style={styles.cardImage}
          source={{uri: item.imageLinks.thumbnail}}/>
        <View style={styles.cardFooter}>
          { favorites?.some(x => x === item.id)
            ? <Icon name='bookmark' size={24} onPress={() => toggleFavoriteBook(item.id)}/>
            : <Icon name='bookmark-o' size={24} onPress={() => toggleFavoriteBook(item.id)}/>
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