import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Picker,
  I18nManager,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import useModal from '_utils/customHooks/useModal';
import {Screen, Button} from '_components/common';
import {SettingsComponent, Header, ModalScreen} from '_components';
import {useTheme} from '@react-navigation/native';
import {JOINUS, PRIVACY_POLICY, RETURN_POLICY} from '../../constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withoutDataActions} from '_redux/actions';
import {SIGN_OUT, SHOW_MODAL} from '_redux/actionTypes';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {AppText} from 'components/common';

const Settings = (props) => {
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {i18n} = useTranslation();

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const dispatch = useDispatch();
  const UserProfileReducer = useSelector(
    ({UserProfileReducer}) => UserProfileReducer,
    shallowEqual,
  );
  const onLogout = () => {
    dispatch(withoutDataActions(SIGN_OUT));
  };
  const [language, setLanguage] = useState('English');
  const [currencyDrop, showCurrencyDrop] = useState(false);
  const {navigation} = props;
  const CurrencyDropDown = (props) => {
    return (
      <>
        <TouchableOpacity
          style={{
            marginVertical: hp(0.5),
            width: wp(87),
            borderLeftColor: colors.borderColor,
            borderLeftWidth: 4,
            height: hp(3),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <AppText color={colors.borderColor} style={{paddingLeft: wp(2)}}>
            {props.currencyName}
          </AppText>
          <Icon
            size={15}
            containerStyle={{position: 'absolute', right: wp(10)}}
            color={colors.borderColor}
            name={props.iconName}
            type={props.iconType}
          />
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            width: wp(100),
          }}
        />
      </>
    );
  };

  const onLangugagechange = (val) => {
    if (val !== 'English') {
      i18n.changeLanguage('en').then(() => {
        I18nManager.forceRTL(true);
      });
    } else if (val !== 'Arabic') {
      i18n.changeLanguage('ar').then(() => {
        I18nManager.forceRTL(true);
      });
    }
    RNRestart.Restart();
  };
  return (
    <Screen>
      <View key="header">
        <Header {...props} title={'Settings'} />
      </View>
      <View key="content" style={styles.content}>
        {/* <SettingsComponent
          label="Language"
          rightComponent={
            <Picker
              selectedValue={i18n.language}
              style={{height: 20, width: 100}}
              onValueChange={(itemValue, itemIndex) => {
                console.log('itemValue', itemValue);
                i18n.changeLanguage(itemValue).then(() => {
                  I18nManager.forceRTL(itemValue === 'ar');
                  RNRestart.Restart();
                });
              }}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="عربى" value="ar" />
            </Picker>
          }
        /> */}
        {_DEV_ && (
          <View>
            <Button
              bold
              onPress={() => {
                i18n.changeLanguage('en').then(() => {
                  I18nManager.forceRTL(false);
                  RNRestart.Restart();
                });
              }}>
              English
            </Button>
            <Button
              bold
              onPress={() => {
                i18n.changeLanguage('ar').then(() => {
                  I18nManager.forceRTL(true);
                  RNRestart.Restart();
                });
              }}>
              Arabic
            </Button>
          </View>
        )}

        <SettingsComponent
          label="Notifications"
          rightComponent={
            <Switch
              trackColor={{false: colors.primary, true: colors.textBlack}}
              thumbColor={!isEnabled ? colors.secondary : colors.appColor}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          }
        />
        <SettingsComponent
          label="Language"
          onIconPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        {modalVisible && (
          <View
            style={{
              width: wp(80),
              alignSelf: 'flex-end',
              marginVertical: hp(1),
            }}>
            <CurrencyDropDown
              currencyName="English"
              iconName="dollar"
              iconType="font-awesome"
            />
            <CurrencyDropDown
              currencyName="Arabic"
              iconName="dollar"
              iconType="font-awesome"
            />
          </View>
        )}

        <SettingsComponent
          label="Currency"
          onIconPress={() => showCurrencyDrop(!currencyDrop)}
        />
        {currencyDrop && (
          <View
            style={{
              width: wp(80),
              alignSelf: 'flex-end',
              marginVertical: hp(1),
            }}>
            <CurrencyDropDown
              currencyName="Dollar"
              iconName="dollar"
              iconType="font-awesome"
            />
            <CurrencyDropDown
              currencyName="Dollar"
              iconName="dollar"
              iconType="font-awesome"
            />
            <CurrencyDropDown
              currencyName="Dollar"
              iconName="dollar"
              iconType="font-awesome"
            />
            <CurrencyDropDown
              currencyName="Dollar"
              iconName="dollar"
              iconType="font-awesome"
            />
          </View>
        )}
        <SettingsComponent label="Terms & Conditions" />
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
      <View key="footer">
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
});
export default Settings;
