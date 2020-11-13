import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {shallowEqual, useSelector} from 'react-redux';
import {AppText, BackgroundImage, Screen} from '../../components/common';
import {HorizontalRow, RoundIcon, TitleBarWithIcon} from '../../components';
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
import {colors} from 'react-native-elements';
import {Color} from 'constants/Colors';

const DrawerIcon = (props) => {
  const {name, onPress} = props;
  return (
    <>
      <RoundIcon
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
  const UserProfileReducer = useSelector(
    ({UserProfileReducer}) => UserProfileReducer,
    shallowEqual,
  );
  return (
    <ImageBackground
      {...props}
      style={styles.bgImage}
      resizeMode={'stretch'}
      source={require('_assets/images/drawer_menu.png')}>
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
            label="Home"
            color={colors.white}
            onPress={() => props.navigation.navigate(HOME)}
            noIcon
          />
          <View style={styles.Horizontalrow} />
          {UserProfileReducer.token ? (
            <>
              <TitleBarWithIcon
                label="Profile"
                color={colors.white}
                onPress={() => props.navigation.navigate(MY_PROFILE)}
                noIcon
              />
              <View style={styles.Horizontalrow} />
            </>
          ) : (
            <>
              <TitleBarWithIcon
                label="Sign In"
                color={colors.white}
                onPress={() => props.navigation.navigate(SIGNIN_SCREEN)}
                noIcon
              />
              <View style={styles.Horizontalrow} />
            </>
          )}

          <TitleBarWithIcon
            label="Favorites"
            color={colors.white}
            onPress={() => props.navigation.navigate(FAVORITES)}
            noIcon
          />
          <View style={styles.Horizontalrow} />
          <TitleBarWithIcon
            label="My orders"
            color={colors.white}
            onPress={() => props.navigation.navigate(MY_ORDERS)}
            noIcon
          />
          <View style={styles.Horizontalrow} />
          <TitleBarWithIcon
            label="About us"
            color={colors.white}
            onPress={() => props.navigation.navigate(ABOUT_US)}
            noIcon
          />
          <View style={styles.Horizontalrow} />
          <TitleBarWithIcon
            label="Settings"
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
            width: '70%',
          }}>
          <DrawerIcon name="snapchat" onPress={() => console.log('hello')} />
          <DrawerIcon name="instagram" onPress={() => console.log('hello')} />
          <DrawerIcon name="twitter" onPress={() => console.log('hello')} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  container: {
    paddingVertical: hp(4),
    paddingLeft: wp(2.8),
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
    width: '70%',
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
