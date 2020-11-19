import React from 'react';
import { View, StyleSheet, Image, ImageBackground, I18nManager } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Header } from '_components';
import { CART_SCREEN } from '_constants/Screens';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Favorites = (props) => {
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
          resizeMode='stretch'
          source={require('_assets/images/header.png')}>

          <Header title={"Favourites"} {...props} />


        </ImageBackground>
      </View>
      <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/background.jpg')}
            />
          </View>

          <View style={styles.viewtxt}>
            <AppText bold size={17} style={styles.txt}>
              A Brief History of time
            </AppText>
            <AppText bold size={13} style={[styles.txt, styles.author]}>
              by brom
            </AppText>
            <AppText bold size={17} style={styles.pricetxt}>
              Price: 30 KW
            </AppText>
            <Button
              bold
              fontSize={15}
              primary
              color="black"
              style={styles.pricetxt}
              onPress={() => props.navigation.navigate(CART_SCREEN)}
              round>
              Add To Cart
            </Button>
            <HorizontalRow
              style={{
                borderColor: 'rgb(200,200,200)',
                borderWidth: 1,
                marginVertical: hp(2),
              }}
            />
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon
                containerStyle={{ paddingRight: wp(5) }}
                size={15}
                color={'black'}
                name={'trash-o'}
                type={'fontawesome'}
              />
              <AppText bold size={17} primary style={styles.txt}>
                Remove
              </AppText>
            </View>
          </View>
        </View>
        <HorizontalRow
          style={{
            borderColor: 'rgb(200,200,200)',
            borderWidth: 1,
            marginVertical: hp(2),
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: hp(35),
    aspectRatio: 0.6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewtxt: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: wp(50),
  },
  pricetxt: {
    marginTop: 20,
    width: wp(45),
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  author: {
    fontStyle: 'italic',
  },
});

export default Favorites;
