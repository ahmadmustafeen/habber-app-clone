import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputWithLabel } from '_components';
import { Button, Screen } from '_components/common';
// import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { UPDATE_PASSWORD } from '_redux/actionTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
const ChangePassword = (props) => {
  const { t } = useTranslation(['ChangePassword'])
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const passChange = () => {
    dispatch(withDataActions(state, UPDATE_PASSWORD));
    // navigate(MY_PROFILE)
  };
  return (
    <Screen noPadding>
      <View key="header">
        <Header {...props} headerImage headerLeft backIcon />
      </View>
      <View key="content" style={styles.container}>
        <InputWithLabel
          color={colors.borderColor}
          name="oldPassword"
          placeholder="*************"
          label={t('password')}
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('old_password', val)}
        />
        <InputWithLabel
          color={colors.borderColor}
          name="newPassword"
          placeholder="*************"
          label={t('newPassword')}
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('password', val)}
        />
        <InputWithLabel
          color={colors.borderColor}
          name="password_confirmation"
          placeholder="*************"
          label={t('confirmNewPassword')}

          value={state.oldPassword}
          onChangeText={(val) =>
            setStateHandler('password_confirmation', val)
          }
        />
      </View>
      <View key="footer" style={styles.footer}>
        <Button
          style={styles.button}
          appColor
          bold
          color={colors.white}
          onPress={() => passChange()}>
          {t('save')}
        </Button>
      </View>
    </Screen >
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    width: wp(90),
    marginTop: hp(-10)

  }
})
export default ChangePassword;
