import React from 'react';
import { View, StyleSheet, Text, I18nManager } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { AppText } from './common';
import { RadioButton } from './RadioButton';
import { FETCH_ADDRESS } from 'redux/actionTypes';
import Loader from 'components/Loader';
import { checkIfLoading } from 'redux/selectors';
import { useSelector, shallowEqual } from 'react-redux';



const AddressCard = (props) => {


    const {
        isLoading
    } = useSelector((state) => {
        return {
            isLoading: checkIfLoading(
                state,
                FETCH_ADDRESS
            )
        }
    }, shallowEqual);
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Loader loading={isLoading} />
            <View style={{ flex: 5 }}>
                <AppText size={15} primary style={styles.spacebtwaddresses}>
                    {props.item.address_name}
                </AppText>
                <AppText size={15} style={styles.spacebtwaddresses}>
                    {`${props.item.address_line1}${props.item.address_line2}`}
                </AppText>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                {props.showRadio && <RadioButton title={props.item.id} business={props.currentValue} hideTitle onPress={props.onPress} />}
            </View>

        </View>
    )

};

const styles = StyleSheet.create({
    spacebtwaddresses: {
        marginLeft: 15,
        marginTop: 10,
    },

    radioButton: {
        // position: '',
        right: 10,
        top: 10
    },
});
export { AddressCard };
