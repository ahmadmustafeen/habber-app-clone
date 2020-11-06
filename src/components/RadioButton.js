import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

const RadioButton = (props) => {
    const { key, title, business, onPress } = props;

    return (

        <View key={key} style={styles.buttonContainer}  >
            <TouchableOpacity style={business == title ? styles.checkedCircle : styles.circle} onPress={onPress} />
            <Text style={(business == title ? { color: '#c27e12', marginLeft: 10, marginRight: 10 } : { color: 'black', marginLeft: 10, marginRight: 10 })} >{title}</Text>
        </View >
    )
}
const styles = StyleSheet.create({

    buttonContainer: {
        marginVertical: 20,
        minWidth: "33.33%",
        flexDirection: 'row'

    },
    checkedText: {
        color: '#794F9B',
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        height: 20,
        borderColor: '#ACACAC',
        width: 20,
        borderRadius: 10,
        backgroundColor: '#c27e12',
    },
})
export { RadioButton }