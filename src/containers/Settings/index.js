import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Picker,
  I18nManager,
  Text,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SWITCH_CURRENCY } from '_redux/actionTypes';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { Screen, Button } from '_components/common';
import { SettingsComponent, Header } from '_components';
import { useTheme } from '@react-navigation/native';
import {
  JOINUS,
  PRIVACY_POLICY,
  RETURN_POLICY,
  TERMS_AND_CONDITIONS_SCREEN,
} from '../../constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withoutDataActions, withDataActions } from '_redux/actions';
import { SIGN_OUT } from '_redux/actionTypes';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppText } from 'components/common';
import PushNotification from 'react-native-push-notification';

const Settings = (props) => {
  const { colors } = useTheme();
  const [item, setItemVisible] = useState({
    currency: false,
    language: false,
    notifications: false,
  });
  const [iso, setIso] = useState('KWD');
  const { i18n } = useTranslation();

  const toggleDropdown = (key) => {
    setItemVisible({ ...item, [key]: !item[key] });
  };
  const dispatch = useDispatch();

  const { UserProfileReducer, FetchCurrencyReducer, FetchCountriesReducer } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchCountriesReducer: state.FetchCountriesReducer,
      FetchCurrencyReducer: state.FetchCurrencyReducer,
    };
  }, shallowEqual);
  console.log('USERPROFILE CURRENCY', UserProfileReducer);
  const onLogout = () => {
    dispatch(withoutDataActions(SIGN_OUT));
  };

  const { navigation } = props;
  console.log(iso);
  const SettingsDropdown = (props) => {
    const {
      value,
      selected,
      currencyName,
      symbol,
      onPress
    } = props

    return (
      <>
        <TouchableOpacity
          style={[{
            marginVertical: hp(0.5),
            width: wp(80),
            borderLeftWidth: 4,
            height: hp(3),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }, selected ? { borderLeftColor: colors.primary } : { borderLeftColor: colors.borderColor }]}
          onPress={() => onPress(value)}>
          <AppText primary={selected} small color={colors.borderColor} style={{ paddingLeft: wp(2) }}>
            {currencyName}
          </AppText>

          <AppText primary={selected} small color={colors.borderColor}>
            {symbol}
          </AppText>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            width: wp(80),
          }}
        />
      </>
    );
  };

  const onLanguageChange = (val) => {
    i18n.changeLanguage(val).then(() => {
      I18nManager.forceRTL(val === 'ar');
      RNRestart.Restart();
    });
  };
  const onToggleNotifications = async (val) => {
    item.notifications
      ? PushNotification.abandonPermissions()
      : await PushNotification.requestPermissions();
    toggleDropdown('notifications');
  };

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
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
          resizeMode="stretch"
          source={require('_assets/images/header.png')}>
          <Header {...props} />
        </ImageBackground>
      </View>
      <View key="content" style={styles.content}>
        <SettingsComponent
          label="Language"
          rightComponent={
            <AppText onPress={() => toggleDropdown('language')} primary>
              {!I18nManager.isRTL ? 'English' : 'Arabic'}
            </AppText>
          }
          onIconPress={() => toggleDropdown('language')}
        />
        {item.language && (
          <View
            style={{
              width: wp(80),
              alignSelf: 'flex-end',
              marginVertical: hp(1),
            }}>
            <SettingsDropdown
              currencyName="English"
              selected={!I18nManager.isRTL}
              iconName="dollar"
              iconType="font-awesome"
              value="en"
              onPress={onLanguageChange}
            />
            <SettingsDropdown
              currencyName="Arabic"
              selected={I18nManager.isRTL}
              iconName="dollar"
              iconType="font-awesome"
              value="ar"
              onPress={onLanguageChange}
            />
          </View>
        )}
        <SettingsComponent
          label="Notifications"
          rightComponent={
            <Switch
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={colors.white}
              // ios_backgroundColor={colors.primary}
              onValueChange={onToggleNotifications}
              value={item.notifications}
            />
          }
        />

        <SettingsComponent
          label="Currency"
          Currency={iso}
          iconName={!item.currency ? 'downcircleo' : 'upcircleo'}
          onIconPress={() => toggleDropdown('currency')}
        />
        {item.currency && (
          <View
            style={{
              width: wp(80),
              alignSelf: 'flex-end',
              marginVertical: hp(1),
            }}>
            {FetchCurrencyReducer.map((item) => {
              return (
                <SettingsDropdown
                  // key={iso}
                  selected={item.iso === iso}
                  currencyName={item.name}
                  symbol={item.symbol}
                  onPress={() => {
                    setIso(item.iso)
                    dispatch(withDataActions({ ...UserProfileReducer, currency: iso }, SWITCH_CURRENCY))
                  }}
                />
              );
            })}
          </View>
        )}
        <SettingsComponent
          onIconPress={() => navigation.navigate(TERMS_AND_CONDITIONS_SCREEN)}
          label="Terms & Conditions"
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(PRIVACY_POLICY)}
          label="Privacy Policy"
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(RETURN_POLICY)}
          label="Return Policy"
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(JOINUS)}
          label="Join Us"
        />
      </View>

      <View key="footer" style={[styles.content, { marginTop: hp(-10) }]}>
        {UserProfileReducer.token && (
          <Button bold onPress={onLogout}>
            LOGOUT
          </Button>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(240,240,240,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: wp(5),
    paddingHorizontal: wp(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  content: {
    width: wp(90),
    alignSelf: 'center',
  },
});
export default Settings;
