import {JOINUS} from 'constants/Screens';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {withDataActions} from 'redux/actions';
import {InputWithLabel, Header} from '_components';
import {Button, AppText, Screen} from '_components/common';
const RequestBooks = (props) => {
  const {
    navigation: {navigate},
    route: {
      params: {book_type},
    },
  } = props;

  const [state, setState] = useState({
    book_type,
    title: '',
    author_name: '',
  });
  const dispatch = useDispatch();
  const handleChange = (key, value) => {
    setState((state) => ({...state, [key]: value}));
  };

  const onSubmit = () => {
    // dispatch(withDataActions(state, SIGN_UP));
  };
  const {title, author_name} = state;

  return (
    <Screen>
      <View key="header">
        <Header
          {...props}
          title={book_type === 'educational' && 'Request Educational Books'}
        />
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          placeholder="Book Title*"
          required
          value={title}
          onChangeText={(value) => handleChange('title', value)}
        />
        <InputWithLabel
          placeholder="Author Name*"
          required
          value={author_name}
          onChangeText={(value) => handleChange('author_name', value)}
        />
        <Button primary>Upload Image</Button>
        <AppText size={15} color="grey" style={styles.txt}>
          * 1 Image allowed (PNG,JPEG,JPG) formats ONLY maximum size 5 MB
        </AppText>
      </View>
      <View key="footer">
        <Button primary onPress={() => onSubmit()}>
          Send Request
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  txt: {
    marginVertical: 10,
  },
});

export default RequestBooks;
