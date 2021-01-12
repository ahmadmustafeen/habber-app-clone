import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppText, Button } from './common';
import { HorizontalRow } from './HorizontalRow';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FavouriteCard = (props) => {
  const { colors } = useTheme();
  return (
    <>
      <View style={styles.profiletop}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: props.item.image }} />
        </View>

        <View style={styles.viewtxt}>
          <AppText bold style={styles.txt}>
            {props.item.title}
          </AppText>
          <AppText bold small style={[styles.txt, styles.author]}>
            by {props.item.author_name}
          </AppText>
          <AppText bold style={styles.pricetxt}>
            Price: {(props.item.price)} KW
          </AppText>
          <Button
            bold
            fontSize={15}
            primary
            color="black"
            style={styles.pricetxt}
            onPress={props.onAddToCart}
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
          <TouchableOpacity
            onPress={props.onRemove}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              containerStyle={{ paddingRight: wp(5) }}
              size={30}
              color={colors.primary}
              name="trash-o"
              type="font-awesome"
            />
            <AppText bold primary style={[styles.txt, { marginLeft: wp(-3) }]}>
              Remove
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRow
        style={{
          borderColor: 'rgb(200,200,200)',
          borderWidth: 1,
          marginVertical: hp(2),
        }}
      />
    </>
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

export { FavouriteCard };
