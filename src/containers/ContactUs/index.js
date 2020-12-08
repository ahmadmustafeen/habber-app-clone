import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  I18nManager,
  Linking,
  Platform,
} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {CONTACT_US} from '_assets/data/StaticData';
import {withDataActions} from '_redux/actions';
import {SUBMIT_CONTACT_US} from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import {checkIfLoading} from '_redux/selectors';
import {validatePhone, validateEmail} from '_helpers/Validators';
import {
  ModalScreen,
  InputWithLabel,
  Header,
  TextWithIcon,
} from '../../components';
import {AppText, Button, Screen} from '../../components/common';

const ContactUs = (props) => {
  const {visible, toggleModal} = useModal();
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });
  const {isLoading, FetchSiteReducer} = useSelector((state) => {
    return {
      FetchSiteReducer: state.FetchSiteReducer,
      isLoading: checkIfLoading(state, SUBMIT_CONTACT_US),
    };
  }, shallowEqual);

  const setStateHandler = (key, val) => {
    setState({...state, [key]: val});
  };
  const validate = () => {
    if (!state.name) {
      Alert.alert('Please Enter Name');
      return false;
    }
    if (!validateEmail(state.email)) {
      Alert.alert('Invalid Email');
      return false;
    }
    if (!state.message) {
      Alert.alert('Please Enter Message');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, SUBMIT_CONTACT_US));
  };
  const {colors} = useTheme();
  return (
    <Screen noPadding>
      <View key="header">
        <ImageBackground
          style={{
            height: hp(21),
            paddingHorizontal: wp(3),
            paddingBottom: hp(8),
            marginBottom: hp(1),
            justifyContent: 'flex-end',
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
          resizeMode="stretch"
          source={require('_assets/images/header.png')}>
          <Header
            headerLeft={
              <Icon
                onPress={() => props.navigation.goBack()}
                color={colors.primary}
                name="leftcircleo"
                type="ant-design"
              />
            }
            {...props}
            title={'Contact Us'}
          />
        </ImageBackground>
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          style={styles.inputfield}
          color={'black'}
          placeholder="Name*"
          required
          value={state.name}
          onChangeText={(val) => setStateHandler('name', val)}
        />
        <InputWithLabel
          placeholder="Email*"
          required
          color={'black'}
          value={state.email}
          onChangeText={(val) => setStateHandler('email', val)}
        />
        <InputWithLabel
          placeholder="Mobile Number (optional)"
          color={'black'}
          required
          value={state.phone}
          onChangeText={(val) => setStateHandler('phone', val)}
        />
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Message*"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline
          value={state.message}
          onChangeText={(val) => setStateHandler('message', val)}
        />
        <ModalScreen
          // image={require("")}
          visible={visible}
          onContinue={onContinue}
          {...CONTACT_US.modalData}
        />
        <Button
          color="white"
          onPress={onSubmit}
          loading={isLoading}
          style={{width: wp(90), alignSelf: 'center'}}>
          Submit
        </Button>
      </View>
      <View key="footer">
        <ImageBackground
          style={{
            marginTop: hp(5),
            height: hp(30),
            paddingHorizontal: wp(3),
            paddingBottom: hp(2),
            justifyContent: 'flex-end',
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
          resizeMode="stretch"
          source={require('_assets/images/footer.png')}>
          <View style={styles.textwithIconContainer}>
            <TextWithIcon
              small
              iconName="whatsapp"
              iconType="font-awesome"
              iconSize={23}
              title="Support Chat"
              value="1234 43222"
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text="Hello"&phone=${FetchSiteReducer.whatsaap_number}`,
                ).catch((err) => console.log('Err', err))
              }
            />
            <TextWithIcon
              small
              iconName="phone-call"
              iconType="feather"
              iconSize={23}
              title="Phone Number"
              value="1234 43222"
              onPress={() =>
                Platform.OS === 'ios'
                  ? Linking.openURL(`telprompt:${FetchSiteReducer.phone_no}`)
                  : Linking.openURL(`tel:${FetchSiteReducer.phone_no}`)
              }
            />
            <TextWithIcon
              small
              iconName="mail"
              iconType="octicons"
              iconSize={23}
              onPress={() =>
                Linking.openURL(`mailto:${FetchSiteReducer.email}`)
              }
              title="Email:"
              value="asd@gmail.com"
            />
          </View>
        </ImageBackground>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    width: wp(90),
    alignSelf: 'center',
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: 20,
    textAlignVertical: 'top',
    padding: 10,
  },
  textwithIconContainer: {
    width: wp(70),
    alignSelf: 'center',
  },
});

export default ContactUs;
