import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { colors } from 'react-native-elements';
import { AppText, Button, Screen } from './common';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NofeaturedBook = props => {


  return (

    <View style={styles.container}>

      <View
        key="content"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Image
          source={require("../assets/images/Icon material-error-outline.png")}
          // source={image}
          style={{ marginRight: wp(3) }}

        />

        <AppText
          bold
          primary={!colors}
          style={{
            color: colors && colors.primary,
            paddingHorizontal: 20,
            textAlign: 'center',
            fontSize: 25,
            marginTop: 20,
            marginBottom: 20,
          }}>
          {unavailabetitle}
        </AppText>
        <AppText
          style={{
            paddingHorizontal: 20,
            fontSize: 18,
            textAlign: 'center',
          }}>
          {unavailabe}
        </AppText>

      </View>


    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    marginBottom: hp(3),
    width: wp(90),
    alignSelf: 'center'
  },

});

export { NofeaturedBook };
