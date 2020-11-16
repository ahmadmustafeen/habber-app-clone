import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  I18nManager,
  ScrollView, Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import { AppText, BackgroundImage, Screen } from '../../components/common';
import { HorizontalRow, RoundIcon, TitleBarWithIcon } from '../../components';
import {
  HOME,
  SETTINGS_SCREEN,
  ABOUT_US,
  CONTACT_US,
  FAVORITES,
  MY_ORDERS,
  MY_PROFILE,
  SIGNIN_SCREEN,
} from '../../constants/Screens';
import UserProfileReducer from 'redux/reducers/UserProfileReducer';
import { colors } from 'react-native-elements';
import { Color } from 'constants/Colors';

const DrawerIcon = (props) => {

  const { name, onPress } = props;
  return (
    <>
      <RoundIcon
        medium

        name={name}
        type="font-awesome"
        color="#fff"
        onPress={onPress}
      />
    </>
  );
};
console.log(Dimensions);
const DrawerMenu = (props) => {
  const { t } = useTranslation(['drawer']);
  const UserProfileReducer = useSelector(
    ({ UserProfileReducer }) => UserProfileReducer,
    shallowEqual,
  );
  const FetchSiteReducer = useSelector(
    ({ FetchSiteReducer }) => FetchSiteReducer,
    shallowEqual,
  );
  console.log("DRAWER,", FetchSiteReducer.email)
  return (
    <ImageBackground
      {...props}
      style={styles.bgImage}
      resizeMode={'stretch'}
      source={require('_assets/images/drawer_menu.png')}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/logo.png')}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.imageProfile}>
                <Image
                  style={styles.imageAvatar}
                  source={require('../../assets/images/Screenshot_Logo.jpg')}
                />
              </View>

              <AppText white bold size={16} style={styles.txt}>
                {UserProfileReducer.first_name
                  ? UserProfileReducer.first_name +
                  ' ' +
                  UserProfileReducer.last_name
                  : 'GUEST USER'}
              </AppText>
            </View>
          </View>
          <View>
            <TitleBarWithIcon
              label={t('home')}
              color={colors.white}
              onPress={() => props.navigation.navigate(HOME)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            {UserProfileReducer.token ? (
              <>
                <TitleBarWithIcon
                  label={t('profile')}
                  color={colors.white}
                  onPress={() => props.navigation.navigate(MY_PROFILE)}
                  noIcon
                />
                <View style={styles.Horizontalrow} />
              </>
            ) : (
                <>
                  <TitleBarWithIcon
                    label={t('signIn')}
                    color={colors.white}
                    onPress={() => props.navigation.navigate(SIGNIN_SCREEN)}
                    noIcon
                  />
                  <View style={styles.Horizontalrow} />
                </>
              )}

            <TitleBarWithIcon
              label={t('favorite')}
              color={colors.white}
              onPress={() => props.navigation.navigate(FAVORITES)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            <TitleBarWithIcon

              label={t('myOrder')}
              color={colors.white}
              onPress={() => props.navigation.navigate(MY_ORDERS)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            <TitleBarWithIcon
              label={t('aboutUs')}
              color={colors.white}
              onPress={() => props.navigation.navigate(ABOUT_US)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            <TitleBarWithIcon
              label={t('contactUs')}
              color={colors.white}
              onPress={() => props.navigation.navigate(CONTACT_US)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            <TitleBarWithIcon
              label={t('setting')}
              color={colors.white}
              onPress={() => props.navigation.navigate(SETTINGS_SCREEN)}
              noIcon
            />
            <View style={styles.Horizontalrow} />
            <AppText secondary size={18} white style={styles.poweredbyline}>
              Powered By Line
          </AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: wp(70),
            }}>
            <DrawerIcon name="snapchat" onPress={() => Linking.openURL(FetchSiteReducer.snapchat_url)} />
            <DrawerIcon name="instagram" onPress={() => Linking.openURL(FetchSiteReducer.instagram_url)} />
            <DrawerIcon name="twitter" onPress={() => Linking.openURL(FetchSiteReducer.twitter_url)} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  container: {
    paddingVertical: hp(4),
    paddingLeft: wp(2.8),

    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },

  imgContainer: {
    height: 100,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    width: wp(70),
    alignItems: 'center',
  },
  poweredbyline: {
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageProfile: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    aspectRatio: 1,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginRight: 10,
  },
  imageAvatar: {
    height: '100%',
    width: '100%',
  },
  Horizontalrow: {
    width: '80%',
    borderColor: Color.primary,
    borderWidth: 0,
    height: 1,
    borderBottomWidth: 0.5,
  },
});
export default DrawerMenu;
