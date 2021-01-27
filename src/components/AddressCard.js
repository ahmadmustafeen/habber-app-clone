import React from 'react';
import { View, StyleSheet, Text, I18nManager, Image } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler'
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
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <View style={{ flex: 8 }}>
        <AppText size={15} primary style={styles.spacebtwaddresses}>
          {item.address_name}
        </AppText>
        <AppText size={15} style={styles.spacebtwaddresses}>
          {`${item.address_line1} ${item.address_line2}`}
        </AppText>
      </View>
      {actionButton &&
        <View style={styles.imageContainer}>
          <View style={[styles.image]} >
            <TouchableOpacity style={styles.image} onPress={onEditPress}>
              <Image source={require("_assets/images/edit.png")} />
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.image} onPress={onTrashPress}>
            <Image source={require("_assets/images/delete.png")} />
          </TouchableOpacity>

        </View>
      }
      <View style={styles.radioButton}>
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

  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    width: wp(6),
    height: wp(6.2)
  },
  headerImage: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    marginTop: hp(1.2),
    // position: 'absolute',
    // right: wp(2),
    // top: hp(1),
    flexDirection: 'row'
  },
  radioButton: {
    flex: 1,
    alignItems: 'center'
  }
});
export { AddressCard };
