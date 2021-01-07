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



    <View
      key="content"
      style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>

      <Image
        source={props.source}
        // source={image}
        style={{ marginRight: wp(3) }}

      />

      <AppText
        bold
        primary={colors}
        style={{
          color: colors && colors.primary,
          paddingHorizontal: 20,
          textAlign: 'center',
          fontSize: 22,

          marginTop: 20,
          // marginBottom: 20,
        }}>
        {props.unavailabetitle}
      </AppText>


    </View>




  );
};
const styles = StyleSheet.create({


});

export { NofeaturedBook };
