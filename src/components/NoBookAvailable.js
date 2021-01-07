import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


const NoBookAvailbe = (props) => {

  return (

    <View style={styles.Container}>
      <View style={styles.textoo}>
        <Text style={{ alignSelf: 'center', fontSize: 35 }}>Oops</Text>
        <Text style={{ alignSelf: 'center', fontSize: 20, width: "60%" }}>{props.emptyy}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',

    paddingTop: 150

  },
  textoo: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30
  }
});

export default NoBookAvailbe;
