import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const RadioButton = (props) => {
    const { key, title, value, onPress, selected, style, noTitle, showSelect, currentValue, elementValue, iconStyle } = props;

    console.log(selected);
    return (

        <View key={key} style={style || styles.buttonContainer}  >
            {/* <TouchableOpacity
                style={selected ? styles.checkedCircle : styles.circle} onPress={onPress} /> */}
            <TouchableOpacity onPress={onPress} style={[{ width: widthPercentageToDP(5), aspectRatio: 1, justifyContent: 'center' }, iconStyle]}>
                <Image style={{ width: '100%', height: '100%' }} source={
                    selected ? require('../assets/images/tick.png') :
                        require('../assets/images/Ellipse55.png')
                } />
            </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        // position: 'absolute',
        // right: 10,
        // top: 10
    },
})
export { RadioButton }