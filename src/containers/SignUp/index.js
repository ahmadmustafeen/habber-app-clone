import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputWithLabel, RoundIcon, ModalScreen, AuthHeader } from '_components';
import { BackgroundImage, Button, AppText } from '_components/common';
import { signUp } from '_assets/data/StaticData';
import { withDataActions } from '_redux/actions/GenericActions';
import { SIGN_UP, SIGN_IN } from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import { validateEmail, validatePassword, validateIsTrue } from '../../helpers/Validators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  loginWithFacebook,
  getInfoFromToken,
} from '../../services/facebookLoginController';

import {
  googleSignInHandler,
  isSignedIn,
} from '../../services/googleLoginController';
import { checkIfLoading } from '_redux/selectors';
import { TERMS_AND_CONDITIONS_SCREEN } from '../../constants/Screens';
import { TouchableOpacity } from 'react-native';

const SignUp = (props) => {

  const dispatch = useDispatch();
  const { navigate } = props.navigation;
  const { visible } = useModal();

  const { t } = useTranslation(['createAccount']);
  const [state, setState] = useState({
    first_name: "",
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { first_name, last_name, email, password, password_confirmation } = state;

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };
  const validate = () => {
    return (
      validateIsTrue(first_name, `${t('Please')}  ${t('firstName')}`, false) &&
      validateIsTrue(last_name, `${t('Please')}  ${t('lastName')}`, false) &&
      validateIsTrue(validateEmail(email), `${t('Please')}  ${t('email')}`, false) &&
      validateIsTrue(validatePassword(password), `${t('Please')}  ${t('password')}`, false) &&
      validateIsTrue((password === password_confirmation), `${t('Please')}  ${t('confirmPassword')}`, false)
    )


  };

  const onSignUp = () => {
    validate() && dispatch(withDataActions(state, SIGN_UP));
  };
  const onContinueModal = () => {
    dispatch(withDataActions(state, SIGN_IN));
  };
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        SIGN_UP,
        SIGN_IN
      )
    };
  }, shallowEqual);
  const signInGoogle = async () => {
    let user = await isSignedIn();
    if (user) {
      Alert.alert('Ops!', 'Already Signed In');
      return user;
    }
    user = await googleSignInHandler();
    return user;
  };
  const signInFacebook = async () => {
    try {
      const data = await loginWithFacebook();
      const accessToken = data.accessToken.toString();
      const userInfo = await getInfoFromToken(accessToken);
      console.log('INFO', userInfo);
    } catch (error) {
      Alert.alert('ERROR', 'Something went wrong, contact admin!');
    }
  };
  return (
    <BackgroundImage>
      <View key="header">
        <AuthHeader {...props} />
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          white
          placeholder="Khaled"
          label={t('firstName')}
          required
          value={first_name}
          onChangeText={(value) => handleChange('first_name', value)}
        />
        <InputWithLabel
          white
          placeholder="Ammar"
          label={t('lastName')}
          required
          value={last_name}
          onChangeText={(value) => handleChange('last_name', value)}
        />
        <InputWithLabel
          white
          placeholder="ahmadalajmi@gmail.com"
          label={t('email')}
          required
          value={email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <InputWithLabel
          white
          secureTextEntry
          placeholder="*********"
          label={t('password')}
          required
          value={password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <InputWithLabel
          white
          secureTextEntry
          placeholder="*********"
          label={t('confirmPassword')}
          required
          value={password_confirmation}
          onChangeText={(value) => handleChange('password_confirmation', value)}
        />
        <View style={{ alignItems: 'center' }}>
          <AppText white secondary size={17}>
            {t('bycreating')}
          </AppText>
          <TouchableOpacity onPress={() => props.navigation.navigate(TERMS_AND_CONDITIONS_SCREEN)}>
            <AppText underline style={styles.termsandservices} size={17}>
              {t('termAndService')}
            </AppText>
          </TouchableOpacity>

          <Button round width="60%" onPress={onSignUp} loading={isLoading}>
            {t('signUp')}
          </Button>
        </View>
        {/* <AppText white secondary style={{ marginTop: 10, marginBottom: 10 }}>
          OR
        </AppText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}> */}
        {/* <RoundIcon
          name="sc-facebook"
          type="evilicon"
          color="#fff"
          onPress={signInFacebook}
        />
        <RoundIcon
          name="google"
          type="font-awesome"
          color="#fff"
          onPress={async () => console.log(await signInGoogle())}
        />
        <RoundIcon
          name="sc-twitter"
          type="evilicon"
          color="#fff"
          onPress={() => console.log('hello')}
        />
      </View> */}
        <ModalScreen
          visible={visible}
          onContinue={onContinueModal}
          loading={isLoading}
          {...signUp.modalData}
        />
      </View>
    </BackgroundImage >
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: hp(5.4),
  },
  termsandservices: {
    color: '#c27e12',
    marginTop: 5,
    marginBottom: 25,
  },
});

export default SignUp;
