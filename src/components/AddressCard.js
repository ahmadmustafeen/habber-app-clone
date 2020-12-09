import React from 'react';
import { View, StyleSheet, Text, I18nManager, Image, TouchableOpacity } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppText } from './common';
import { RadioButton } from './RadioButton';
import { FETCH_ADDRESS } from '_redux/actionTypes';
import Loader from '_components/Loader';
import { checkIfLoading } from '_redux/selectors';
import { useSelector, shallowEqual } from 'react-redux';

const AddressCard = (props) => {
  const {
    actionButton,
    item,
    currentValue,
    onPress,
    showRadio,
    onEditPress, onTrashPress
  } = props;
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(state, FETCH_ADDRESS),
    };
  }, shallowEqual);
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Loader loading={isLoading} />
      <View style={{ flex: 5 }}>
        <AppText size={15} primary style={styles.spacebtwaddresses}>
          {item.address_name}
        </AppText>
        <AppText size={15} style={styles.spacebtwaddresses}>
          {`${item.address_line1}${item.address_line2}`}
        </AppText>
      </View>
      {actionButton &&
        <View style={styles.imageContainer}>
          <View style={[styles.image]} >
            <TouchableOpacity onPress={onEditPress}>
              <Image style={{ width: "100%", height: "100%" }} source={require("_assets/images/edit.png")} />
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.image} onPress={onTrashPress}>
            <Image style={{ width: "100%", height: "100%" }} source={require("_assets/images/delete.png")} />
          </TouchableOpacity>

        </View>
      }
      <View style={{ flex: 1, alignItems: 'center' }}>
        {showRadio && (
          <RadioButton
            selected={item.id === currentValue}
            hideTitle
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },

  radioButton: {
    // position: '',
    right: 10,
    top: 10,
  },
  image: {
    marginHorizontal: wp(1),
    width: wp(3.7),
    height: wp(4.5)
  },
  imageContainer: {
    position: 'absolute',
    right: wp(2),
    top: hp(1),
    flexDirection: 'row'
  }
});
export { AddressCard };
