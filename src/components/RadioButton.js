import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

const RadioButton = (props) => {
    const { key, title, value, onPress, selected, style, noTitle, showSelect, currentValue, elementValue } = props;

    console.log(selected);
    return (

        <View key={key} style={style || styles.buttonContainer}  >
            <TouchableOpacity style={selected ? styles.checkedCircle : styles.circle} onPress={onPress} />
            {!noTitle && <Text style={[styles.title, (selected && { color: '#c27e12' })]} >{title}</Text>}

        </View >
    )
}
const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        marginRight: 10,
        color: 'black',
    },
    buttonContainer: {
        marginVertical: 20,
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

    radioButton: {
        position: 'absolute',
        right: 10,
        top: 10
    },
})
export { RadioButton }