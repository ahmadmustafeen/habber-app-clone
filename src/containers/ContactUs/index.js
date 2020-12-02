import { validatePhone, validateEmail } from '_helpers/Validators';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, ImageBackground, I18nManager } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CONTACT_US } from '_assets/data/StaticData';
import { withDataActions } from '_redux/actions';
import { SUBMIT_CONTACT_US } from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import { checkIfLoading } from '_redux/selectors';

import {
  ModalScreen,
  InputWithLabel,
  Header
} from '../../components';
import { Button, Screen } from '../../components/common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
const ContactUs = (props) => {
  const { visible, toggleModal } = useModal();
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
  const {
    isLoading,
  } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        SUBMIT_CONTACT_US,
      ),
    };
  }, shallowEqual);

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
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
  const { colors } = useTheme()
  return (
    <View>
      <ImageBackground
        style={{
          height: hp(21),
          paddingHorizontal: wp(3),
          paddingBottom: hp(8),
          marginBottom: hp(1),
          justifyContent: 'flex-end',
          transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        }}
        resizeMode='stretch'
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
          {...props} title={'Contact Us'} />

      </ImageBackground>


      <Screen>
        <View key="content" style={styles.content}>
          <InputWithLabel
            style={styles.inputfield}
            color={"black"}
            placeholder="Name*"
            required
            value={state.name}
            onChangeText={(val) => setStateHandler('name', val)}
          />
          <InputWithLabel
            placeholder="Email*"
            required
            color={"black"}
            value={state.email}
            onChangeText={(val) => setStateHandler('email', val)}
          />
          <InputWithLabel
            placeholder="Mobile Number (optional)"
            color={"black"}
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
        </View>
        <View key="footer">
          <Button color="white" onPress={onSubmit} loading={isLoading}>
            Submit
          </Button>
        </View>

      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
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
});

export default ContactUs;
