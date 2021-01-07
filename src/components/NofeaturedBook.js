import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { AppText, Button, Screen } from './common';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

const NofeaturedBook = props => {
  const { colors } = useTheme()

  return (

    <View key="content" style={styles.container}>

      <View

        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.image}>
          <Image
            source={require("../assets/images/errorImage.png")}
            style={{ width: '100%', height: '100%' }}
          />
        </View>


        <AppText
          bold
          primary={!colors}
          UpperCase
          small
          style={{
            color: colors && colors.secondary,
            textAlign: 'center',
          }}>
          {props.unavailabetitle}
        </AppText>
        <AppText
          size={28}
          bold
          style={{

            // fontSize: 18,
            fontStyle: "italic",
            textAlign: 'center',
          }}>
          {props.unavailabe}
        </AppText>

      </View>


    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: wp(90),
    alignSelf: 'center'
  },
  image: {
    marginBottom: hp(5),
    width: wp(30),
    aspectRatio: 1,
  }
});

export { NofeaturedBook };
