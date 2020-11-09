import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {useDispatch} from 'react-redux';
import {withDataActions} from '_redux/actions';
import {REQUEST_BOOK} from '_redux/actionTypes';
import {InputWithLabel, Header} from '_components';
import {Button, AppText, Screen} from '_components/common';
import {validateIsTrue} from '_helpers/Validators';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
    image: '',
  });
  const {title, author_name} = state;

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setState((state) => ({...state, [key]: value}));
  };

  const validate = () => {
    validateIsTrue(title, 'Title');
    validateIsTrue(author_name, 'Author Name');
    return true;
  };

  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, REQUEST_BOOK));
  };

  const setImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        handleChange('image', response.uri);
      }
    });
  };
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
        <Button primary onPress={setImage}>
          Upload Image
        </Button>
        <AppText size={15} color="grey" style={styles.txt}>
          * 1 Image allowed (PNG,JPEG,JPG) formats ONLY maximum size 5 MB
        </AppText>
      </View>
      <View key="footer">
        <Button primary onPress={onSubmit}>
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
