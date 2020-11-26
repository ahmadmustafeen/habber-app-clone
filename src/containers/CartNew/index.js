import React, { useState } from 'react'
import { Header } from '_components/Header';
import { ScrollView, View, Text, ImageBackground, I18nManager, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { AppText, Button } from 'components/common';
import { InputWithLabel } from 'components';

const CartNew = (props) => {
    const [state, setState] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        securityCode: ""
    })
    const setStateHandler = (key, val) => {
        setState({ ...state, [key]: val });
    };
    const { colors } = useTheme()
    return (
        <ScrollView>
            <ImageBackground
                style={{
                    height: hp(21),
                    paddingHorizontal: wp(3),
                    paddingBottom: hp(8),
                    marginBottom: hp(1),
                    justifyContent: 'flex-end',
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                }}
                resizeMode="stretch"
                source={require('_assets/images/header.png')}>
                <Header headerLeft={
                    <Icon
                        onPress={() => props.navigation.goBack()}
                        color={colors.primary}
                        name="leftcircleo"
                        type="ant-design"
                    />}
                    {...props} title={'Cart'} />
            </ImageBackground>
            <View key="content">
                <View style={styles.container}>
                    <AppText style={{ paddingVertical: hp(1) }}>
                        Name on Card
                    </AppText>
                    <InputWithLabel color={"black"} value={state.cardName} name="cardName" onChangeText={(val) => setStateHandler('cardName', val)} />
                    <AppText style={{ paddingVertical: hp(1) }}>
                        Card Number
                    </AppText>
                    <InputWithLabel color={"black"} name="cardNumber" value={state.cardNumber} onChangeText={(val) => setStateHandler('cardNumber', val)} />
                    <AppText style={{ paddingVertical: hp(1) }}>
                        Expiry Date
                    </AppText>
                    <InputWithLabel color={"black"} name="expiryDate" value={state.expiryDate} onChangeText={(val) => setStateHandler('expiryDate', val)} />
                    <AppText style={{ paddingVertical: hp(1) }}>
                        Security Code
                    </AppText>
                    <InputWithLabel color={"black"} name="securityCode" value={state.securityCode} onChangeText={(val) => setStateHandler('securityCode', val)} />
                    <Button title={"submit"} type="submit" />
                </View>



            </View>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        width: wp(80),
        alignSelf: 'center'
    }
})
export default CartNew;