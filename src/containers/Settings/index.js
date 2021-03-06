import React, { useEffect, useState } from 'react';
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
import { PUSH_NOTIFICATION_FUNCTION, PUSH_NOTIFICATION_FUNCTION_REDUCER, SWITCH_LANG } from '../../redux/actionTypes';
import { BackHandler } from 'react-native';
import { Alert } from 'react-native';

const LANGUAGES = [{ id: 1, iso: 'ar', name: 'Arabic' }, { id: 2, iso: 'en', name: 'English' }];




const Settings = (props) => {
  const { colors } = useTheme();
  const { UserProfileReducer, FetchCurrencyReducer, FetchCountriesReducer } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchCountriesReducer: state.FetchCountriesReducer,
      FetchCurrencyReducer: state.FetchCurrencyReducer,
    };
  }, shallowEqual);
  const [item, setItemVisible] = useState({
    currency: false,
    language: false,
    notifications: !!UserProfileReducer.notification,
  });

  const [currencyVal, setCurrencyVal] = useState(UserProfileReducer.currency);

  const toggleDropdown = (key) => {
    setItemVisible({ ...item, [key]: !item[key] });
  };
  const dispatch = useDispatch();


  const onLogout = () => {
    dispatch(withoutDataActions(SIGN_OUT));
  };
  console.log({ ...UserProfileReducer }, "THIS IS USER PROFILE REDUCER")

  const { navigation } = props;
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
            // height: hp(6),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

          }, selected ? { borderLeftColor: colors.primary } : { borderLeftColor: colors.borderColor }
            ,
          ]}
          onPress={() => onPress(value)}>
          <AppText primary={selected} small color={colors.borderColor} style={{ paddingHorizontal: wp(2), }}>
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
    let old = I18nManager.isRTL ? 'ar' : 'en'
    // Alert.alert(val.iso)
    val.iso === old || dispatch(withDataActions({ ...UserProfileReducer, language: val, setting: true }, SWITCH_LANG))
    // i18n.changeLanguage(val).then(() => {
    //   I18nManager.forceRTL(val === 'ar');
    //   RNRestart.Restart();
    // });
  };
  const onToggleNotifications = async (val) => {
    dispatch(withDataActions({ notification: val ? 1 : 0, userID: UserProfileReducer.id }, PUSH_NOTIFICATION_FUNCTION))
    dispatch(withoutDataActions(PUSH_NOTIFICATION_FUNCTION_REDUCER))
    console.log(val)
    item.notifications
      ? PushNotification.abandonPermissions()
      : await PushNotification.requestPermissions();
    toggleDropdown('notifications');
  };
  const { t } = useTranslation(['Settings']);
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
  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props} headerImage />
      </View>
      <View key="content" style={[styles.content, {

      }]}>
        <SettingsComponent
          label={t("language")}
          rightComponent={
            <AppText onPress={() => toggleDropdown('language')} primary>
              {!I18nManager.isRTL ? 'English' : t('Arabic')}
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
              currencyName={t('English')}
              selected={!I18nManager.isRTL}
              iconName="dollar"
              iconType="font-awesome"
              value={{ id: 2, iso: 'en', name: 'English' }}
              onPress={onLanguageChange}
            />

            <SettingsDropdown
              currencyName={t('Arabic')}
              selected={I18nManager.isRTL}
              iconName="dollar"
              iconType="font-awesome"
              value={{ id: 1, iso: 'ar', name: 'Arabic' }}
              onPress={onLanguageChange}
            />
          </View>
        )}
        <SettingsComponent
          label={t("notification")}
          rightComponent={
            <Switch
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.secondary}
              onValueChange={onToggleNotifications}
              value={item.notifications}
            />
          }
        />

        <SettingsComponent
          label={t('currency')}
          Currency={currencyVal.iso}
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
                  selected={item.iso === currencyVal.iso}
                  currencyName={item.iso}
                  symbol={item.symbol}
                  onPress={() => {
                    setCurrencyVal(item)
                    dispatch(withDataActions({ ...UserProfileReducer, currency: item }, SWITCH_CURRENCY))
                  }}
                />
              );
            })}
          </View>
        )}
        <SettingsComponent
          onIconPress={() => navigation.navigate(TERMS_AND_CONDITIONS_SCREEN)}
          label={t('termsAndConditions')}
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(PRIVACY_POLICY)}
          label={t('privacyPolicy')}
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(RETURN_POLICY)}
          label={t('returnPolicy')}
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(JOINUS)}
          label={t('joinUs')}
        />


        <View
          // key="footer"
          style={{ width: wp(90), flex: 1, alignSelf: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}
        // style={styles.content}

        >
          {UserProfileReducer.token && (
            <Button bold color="white" onPress={onLogout}>
              {I18nManager.isRTL ? "تسجيل خروج" : "LOGOUT"}
            </Button>
          )}
        </View>
      </View>
    </Screen >
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
    paddingTop: hp(1),
    width: wp(90),
    minHeight: hp(75),
    alignSelf: 'center',
  },
});
export default Settings;
