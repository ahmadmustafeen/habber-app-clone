import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import { AppText, Button, Screen } from '../../components/common';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  MY_ADDRESS_BOOK,
} from '_constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';
const MyProfile = (props) => {
  const { t } = useTranslation(['MyProfile']);
  const { first_name, last_name, email, profile_pic } = useSelector(
    ({ UserProfileReducer }) => UserProfileReducer,
    shallowEqual,
  );




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



  const { colors } = useTheme();
  const { navigate } = props.navigation;
  return (



    <Screen>
      <View key="header">
        <Header
          headerImage
          {...props}
        />
      </View>
      <View key="content">
        <View style={styles.profiletop}>
          <View
            style={[styles.imgContainer, { borderColor: colors.borderColor }]}>
            <Image
              style={styles.image}
              source={profile_pic ? { uri: profile_pic } : require('_assets/images/noUser.png')}

            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: hp(2), width: wp(60) }}>
            <AppText bold small style={styles.txt}>
              {`${first_name} ${last_name}`}
            </AppText>
            <AppText small style={styles.txt}>
              {email}
            </AppText>
          </View>
          <TouchableOpacity
            style={{ position: 'absolute', right: wp(5), top: wp(3) }}
            onPress={() => navigate(EDIT_PROFILE)}>
            {I18nManager.isRTL ?
              <Image source={require('../../assets/images/editbtnAR.png')} /> :
              <Image source={require('../../assets/images/editbtn.png')} />}
          </TouchableOpacity>
        </View>
        <HorizontalRow
          style={[styles.row, { borderBottomColor: colors.borderColor }]}
        />
        <View style={styles.btnview}>
          <Button
            icon
            fontSize={13}
            style={{ marginBottom: 15 }}
            onPress={() => navigate(MY_ADDRESS_BOOK)}>
            {t('myAddressBook')}
          </Button>
          <Button
            fontSize={13}
            icon
            onPress={() => navigate(CHANGE_PASSWORD)}>
            {t('changePassword')}
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: wp(25),
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    marginLeft: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginLeft: hp(1.6),
    marginBottom: hp(0.6),
  },
  btnview: {
    marginTop: 30,
  },
  editbtn: {
    width: 80,
    // paddingVertical: 5,
    textAlign: 'center',
    position: 'absolute',
    // right: 10,
    // top: -20,
    color: 'black',
  },
  profiletop: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: hp(5),
  },
  row: {
    // width: wp(0),
    borderBottomWidth: hp(0.1),
  },
});

export default MyProfile;
