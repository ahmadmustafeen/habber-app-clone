import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const HeaderSearch = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>

            </View>
            <View>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: Platform.OS == 'ios' ? 150 : 90,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0a2937'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

});

export { HeaderSearch };
