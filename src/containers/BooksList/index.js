import React, {useRef} from 'react';
import {FlatList, View} from 'react-native';
import {ModalScreen, BookCard, TitleBarWithIcon} from '../../components';

import {AppText, Button, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {bookListData} from './dummydata';

const BooksList = (props) => {
  const {label} = props.route.params;
  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <View>
      <TitleBarWithIcon label={label} />
      <Button onPress={toggleModal}>Press</Button>
      <ModalScreen ref={modalRef} />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString() + item}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={bookListData}
        renderItem={(book) => <BookCard {...book.item} />}
        ItemSeparatorComponent={() => (
          <View style={{marginVertical: 20, borderWidth: 0.5}} />
        )}
        ListEmptyComponent={() => (
          <View>
            <AppText>No Book Available</AppText>
          </View>
        )}
        ListFooterComponent={() => <View style={{paddingBottom: 50}} />}
      />
    </View>
  );
};
export default BooksList;
