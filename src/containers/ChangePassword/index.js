import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputWithLabel, ModalScreen } from '_components';
import { Button, Screen } from '_components/common';
// import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { UPDATE_PASSWORD } from '_redux/actionTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PASSWORD_CHANGE } from '_assets/data/StaticData';
import useModal from '_utils/customHooks/useModal';
import { useTranslation } from 'react-i18next';
import { validateIsTrue, validatePassword } from '../../helpers/Validators';
import { checkIfLoading } from '../../redux/selectors';
const ChangePassword = (props) => {
  const { t } = useTranslation(['ChangePassword'])
  const { visible, toggleModal } = useModal();
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    UserProfileReducer,
    FetchSiteReducer
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer
    };
  }, shallowEqual);


  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        UPDATE_PASSWORD,
      )
    };
  }, shallowEqual);
  const [state, setState] = useState({
    email: UserProfileReducer.email,
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const Validate = () => {
    return (
      validateIsTrue(state.old_password, `${t('Please')}  ${t('password')}`, false, t('ok')) &&
      validateIsTrue(state.password, `${t('Please')}  ${t('newPassword')}`, false, t('ok')) &&
      validateIsTrue(state.password_confirmation, `${t('Please')}  ${t('confirmNewPassword')}`, false, t('ok')) &&
      validatePassword(state.password) &&
      validateIsTrue((state.password === state.password_confirmation), `${t('Please')}  ${t('PassNotMatch')}`, false, t('ok'))
    )
  }
  const passChange = () => {

    Validate() &&


      dispatch(withDataActions(state, UPDATE_PASSWORD));
    // navigate(MY_PROFILE)
  };
  return (
    <View style={{ height: hp(100) }} >
      <View >
        <Header {...props} headerImage headerLeft backIcon />
      </View>
      <View style={styles.container}>
        <InputWithLabel
          color={colors.borderColor}
          // name="oldPassword"
          subheading
          placeholder="*************"
          label={t('password')}
          secureTextEntry
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('old_password', val)}
        />
        <InputWithLabel
          color={colors.borderColor}
          subheading
          // name="newPassword"
          placeholder="*************"
          secureTextEntry
          label={t('newPassword')}
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('password', val)}
        />
        <InputWithLabel
          subheading
          color={colors.borderColor}
          name="password_confirmation"
          secureTextEntry
          placeholder="*************"
          label={t('confirmNewPassword')}

          value={state.oldPassword}
          onChangeText={(val) =>
            setStateHandler('password_confirmation', val)
          }
        />

      </View>
      <ModalScreen
        // image={require("")}
        visible={visible}
        onContinue={onContinue}
        {...PASSWORD_CHANGE.modalData}
      />
      <View style={{ marginBottom: hp(5) }}>
        <Button
          loading={isLoading}
          style={styles.button}
          appColor
          bold
          color={colors.white}
          onPress={() => passChange()}>
          {t('save')}
        </Button>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    flex: 1
  },
  button: {
    alignSelf: 'center',
    width: wp(90),
  },
  footer: {
    alignSelf: 'flex-end',
    bottom: hp(3),
    right: wp(5)
  }
})
export default ChangePassword;
