import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, I18nManager, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { REQUEST_BOOK } from '_redux/actionTypes';
import { InputWithLabel, Header, ModalScreen, } from '_components';
import { Button, AppText, Screen } from '_components/common';
import { validateIsTrue } from '_helpers/Validators';
// import {
//   ModalScreen,
//   InputWithLabel,
//   Header,

// } from '../../components'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { checkIfLoading } from '../../redux/selectors';
import { Keyboard } from 'react-native';
import { REQUEST_BOOK_MODAL } from '_assets/data/StaticData';
import useModal from '_utils/customHooks/useModal';
import { BackHandler } from 'react-native';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const RequestBooks = (props) => {



  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])
  // console.log(Keyboard.removeCurrentListener(() => console.log("worked")))

  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(state, REQUEST_BOOK),
    };
  }, shallowEqual);

  const { t } = useTranslation(['RequestBook'])
  const { visible, toggleModal } = useModal();
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const toggleCart = () => {
    toggleModal();
    props.navigation.navigate('AddToCart');
  }
  const toggleSearch = () => {
    toggleModal();
    props.navigation.navigate('Search');
  }
  const {
    navigation: { navigate },
    route: {
      params: { book_type },
    },
  } = props;

  const [state, setState] = useState({
    book_type,
    title: '',
    author_name: '',
    image: "",
  });
  console.log(state, "request book")
  const { title, author_name } = state;
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const validate = () => {
    return (
      validateIsTrue(title, `${t('Please')} ${t('Title')}`, false, t('ok')) &&
      validateIsTrue(author_name, `${t('Please')} ${t('author')}`, false, t('ok'))
    )
  };

  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, REQUEST_BOOK));
  };
  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);
  const setImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.fileSize > 5000000) {
        return validateIsTrue(false, I18nManager.isRTL ? "الرجاء تحديد صورة أقل من 5 ميغا بايت" : "Please select a image less than 5mbs", false);
      }
      else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.data.size, "image")
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response)
        handleChange('image', {
          uri: Platform.OS == 'ios' ? response.uri.replace("file://", "/private") : response.uri,
          type: response.type,
          name: Platform.OS == 'ios' ? "placeholder_text" : response.fileName,
        });
      }
    });
  };
  const getProfilePic = () => {
    if (state.image.uri) {
      return { uri: state.image.uri }
    }
    if (state.image) {
      return { uri: state.image.uri }
    }
    return require('_assets/images/noUser.png')

  }
  console.log("ImageINrequestbook", state)
  return (

    <Screen noPadding>
      <View key="header">

        <Header {...props} headerImage
          title={(book_type === 'educational') ? t("requestEducationalBook") : t("requestBook")}
        />
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          placeholder={t('bookTitle')}
          required
          color="black"
          value={title}
          onChangeText={(value) => handleChange('title', value)}
        />
        <InputWithLabel
          placeholder={t('authorName')}
          required
          color="black"
          value={author_name}
          onChangeText={(value) => handleChange('author_name', value)}
        />
        <Button primary onPress={setImage} add >
          {t('uploadImage')}
        </Button>
        <AppText size={15} color="grey" style={styles.txt}>
          {t('restrictionText')}
        </AppText>
        <View style={{ paddingBottom: hp(1) }}>
          <Image
            style={styles.image}
            source={{ uri: state.image.uri }}
          />
        </View>

        {/* source={{ uri: state.image.uri }}  */}
        {/* <View style={{ width: wp(80), height: hp(30) }}>
          <Image source={require("_assets/images/addsign.png")} />
        </View> */}


        <ModalScreen
          // image={require("")}
          visible={visible}
          onContinue={onContinue}
          onCart={toggleCart}

          {...REQUEST_BOOK_MODAL.modalData}
          description={(book_type !== 'educational')
            ?
            I18nManager.isRTL ? 'تم إرسال نموذج طلب كتابك بنجاح' : `Your Book Request Form is Submitted Successfully` :
            I18nManager.isRTL ? 'تم تقديم نموذج طلب كتابك التعليمي بنجاح' : `Your Educational Book Request Form is Submitted Successfully`
          }
          onSearch={toggleSearch}
        />
      </View>

      <View key="footer" style={[styles.content, { paddingBottom: hp(2) }]}>
        <Button color="white" bold primary onPress={onSubmit} style={{ marginTop: hp(0) }} loading={isLoading} >
          {t('sendRequest')}
        </Button>
      </View>
    </Screen>

  );
};

const styles = StyleSheet.create({
  txt: {
    marginVertical: 20,
  },
  content: {

    width: wp(90),
    alignSelf: 'center'
  },
  image: {

    width: wp(25),
    height: hp(19),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

export default RequestBooks;
