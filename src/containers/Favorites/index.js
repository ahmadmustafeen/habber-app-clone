import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppText, Button, Screen} from '_components/common';
import {HorizontalRow} from '_components';
import {Icon} from 'react-native-elements';
import {ADD_TO_CART} from '_constants/Screens';

const Favorites = (props) => {
  return (
    <Screen>
      <View key="header"></View>
      <View key="content">
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/background.jpg')}
            />
          </View>

          <View style={styles.viewtxt}>
            <AppText bold size={20} style={styles.txt}>
              A Brief History of time
            </AppText>
            <AppText bold size={15} style={styles.txt}>
              by brom
            </AppText>
            <AppText bold size={20} style={styles.pricetxt}>
              Price: 30 KW
            </AppText>
            <Button
              bold
              fontSize={15}
              primary
              color="black"
              style={styles.pricetxt}
              onPress={() => props.navigation.navigate(ADD_TO_CART)}
              round>
              Add To Cart
            </Button>
            <HorizontalRow />
            <AppText bold size={17} primary style={styles.txt}>
              Remove
            </AppText>
          </View>
        </View>
        <HorizontalRow />

        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Screenshot_Logo.jpg')}
            />
          </View>

          <View style={styles.viewtxt}>
            <AppText bold size={20} style={styles.txt}>
              Lolita
            </AppText>
            <AppText bold size={15} style={styles.txt}>
              by Neil Gaiman
            </AppText>
            <AppText bold size={20} style={styles.pricetxt}>
              Price: 30 KW
            </AppText>
            <Button
              bold
              fontSize={15}
              primary
              color="black"
              style={styles.pricetxt}
              onPress={() => props.navigation.navigate(ADD_TO_CART)}
              round>
              Add To Cart
            </Button>
            <HorizontalRow />
            <AppText bold size={17} primary style={styles.txt}>
              Remove
            </AppText>
          </View>
        </View>
        <HorizontalRow />

        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/background.jpg')}
            />
          </View>

          <View style={styles.viewtxt}>
            <AppText bold size={20}>
              A Brief History of time
            </AppText>
            <AppText bold size={15}>
              by brom
            </AppText>
            <AppText bold size={20} style={styles.pricetxt}>
              Price: 30 KW
            </AppText>
            <Button
              bold
              fontSize={15}
              primary
              color="black"
              style={styles.pricetxt}
              onPress={() => props.navigation.navigate(ADD_TO_CART)}
              round>
              Add To Cart
            </Button>
            <HorizontalRow />
            <AppText bold size={17} primary style={styles.txt}>
              Remove
            </AppText>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 220,
    aspectRatio: 0.7,
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
    maxWidth: '100%',
  },
  pricetxt: {
    marginTop: 20,
    width: 200,
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default Favorites;
