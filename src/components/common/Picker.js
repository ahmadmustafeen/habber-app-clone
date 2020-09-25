import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './AppText';
import {Color} from '../../constants/Colors';
class Picker extends Component {
  modelSelector;

  extractLabel() {
    const {value: val, placeholder, data} = this.props;
    const Placeholder = placeholder || 'Choose one';
    let label;
    if (val) {
      let item = data.filter(({label}) => label == val);
      if (item.length) {
        return (label = item[0].label);
      }
    } else return (label = Placeholder || undefined);
  }

  render() {
    const {
      onValueChange,
      unHighlight,
      initValue,
      cancelText,
      label,
      required,
      disabled,
      value,
    } = this.props;
    const {containerStyle, pickerContainerStyle, textStyle} = styles;

    return (
      <View style={containerStyle}>
        {label ? (
          <AppText>
            {`${label} `}
            {required ? <AppText>*</AppText> : null}
          </AppText>
        ) : null}
        <View style={pickerContainerStyle}>
          <ModalSelector
            {...this.props}
            ref={(ref) => (this.modelSelector = ref)}
            selectStyle={{borderWidth: 0}}
            style={{flex: 1}}
            selectTextStyle={textStyle}
            initValueTextStyle={textStyle}
            initValue={this.extractLabel() || initValue}
            onChange={({value, label}) => onValueChange({value, label})}
            cancelText={cancelText || 'Cancel'}
            valueExtractor={(item) => item.label}
            labelExtractor={(item) => item.label}
            keyExtractor={(item) => `${item.value}-${item.label}`}
          />
          {!value ? (
            <View style={{marginRight: hp('1.5%'), Top: hp('0.75%')}}>
              <TouchableWithoutFeedback
                onPress={() => (disabled ? null : this.modelSelector.open())}>
                <SimpleLineIcons
                  name="arrow-down"
                  size={20}
                  color={Color.warmGray}
                />
              </TouchableWithoutFeedback>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginBottom: 10,
  },
  pickerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 45,
    borderColor: Color.warmGray,
  },
  textStyle: {
    fontFamily: 'Avenir-Medium',
    paddingLeft: 0,
    textAlign: 'left',
    color: Color.textBlack,
    fontSize: 20,
  },
});
export {Picker};
