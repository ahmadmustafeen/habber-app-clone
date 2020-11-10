import {BookListContainer} from 'components';
import React from 'react';
import {ScrollView} from 'react-native';
import {TitleBarWithIcon, Header} from '_components';

const BooksList = (props) => {
  const {
    route: {
      params: {label, data},
    },
    navigation: {navigate},
  } = props;

  return (
    <ScrollView>
      <Header {...props} />
      <TitleBarWithIcon label={label} />
      <BookListContainer data={data} {...props} />
    </ScrollView>
  );
};
export default BooksList;
