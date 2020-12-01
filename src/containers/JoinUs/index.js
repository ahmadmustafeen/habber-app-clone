import React, { useState } from 'react';
import {
  validatePhone,
  validateEmail,
  validateIsTrue,
} from '_helpers/Validators';
import { useDispatch } from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  I18nManager,
  ImageBackground,
} from 'react-native';
import {
  InputWithLabel,
  RadioButton,
  ModalScreen,
  Header,
} from '../../components';
import { withDataActions } from '_redux/actions';
import { Button, AppText } from '_components/common';
import { JOIN_US } from '_assets/data/StaticData';
import { JOINUS, REQUESTBOOKS } from '_constants/Screens';
import { SUBMIT_JOIN_US } from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const JoinUs = (props) => {
  const { visible, toggleModal } = useModal();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    details: '',
    message: '',
    phone: '',
    business_type: '',
    product_type: '',
  });
  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const validate = () => {
    if (!state.name) {
      Alert.alert('Please Enter Name');
      return false;
    }
    if (!validateEmail(state.email)) {
      Alert.alert('Invalid Email');
      return false;
    }

    if (!validatePhone(state.phone)) {
      Alert.alert('Invalid Phone Number');
      return false;
    }
    validateIsTrue(state.details, 'Details');
    validateIsTrue(state.business_type, 'Business Type');
    validateIsTrue(state.product_type, 'Product Type');

    return true;
  };
  const businessTypeFunc = (id) => {
    setStateHandler('business_type', id);
  };
  const productTypeFunc = (id) => {
    setStateHandler('product_type', id);
  };
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const onSubmit = () => {
    console.log(validate());
    dispatch(withDataActions(state, SUBMIT_JOIN_US));
  };
  const { navigate } = props.navigation;
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
        <Header {...props} title={'Join Us'} />
      </ImageBackground>
      <View key="content" style={styles.content}>
        <InputWithLabel
          color={'black'}
          style={styles.inputfield}
          placeholder="Name*"
          required
          value={state.name}
          onChangeText={(val) => setStateHandler('name', val)}
        />
        <InputWithLabel
          placeholder="Email*"
          required
          color={'black'}
          value={state.email}
          onChangeText={(val) => setStateHandler('email', val)}
        />
        <InputWithLabel
          placeholder="Mobile Number*"
          required
          color={'black'}
          value={state.phone}
          onChangeText={(val) => setStateHandler('phone', val)}
        />
        <View style={{ padding: wp(4) }}>
          <AppText style={styles.businesstype}>Select Business Type*</AppText>
          <View style={styles.row}>
            <RadioButton
              title="Individual"
              selected={state.business_type === 'Individual'}
              onPress={() => businessTypeFunc('Individual')}
            />
            <RadioButton
              title="Corporation"
              selected={state.business_type === 'Corporation'}
              onPress={() => businessTypeFunc('Corporation')}
            />
            <RadioButton
              title="Publishers"
              selected={state.business_type === 'Publishers'}
              onPress={() => businessTypeFunc('Publishers')}
            />
          </View>

        </View>

        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Details*"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
          value={state.details}
          onChangeText={(val) => setStateHandler('details', val)}
        />
        <View style={{ padding: wp(4) }}>
          <AppText style={styles.businesstype}>Select Products Type*</AppText>
          <View style={styles.row}>
            <RadioButton
              title="Books"
              selected={state.product_type === 'Books'}
              onPress={() => productTypeFunc('Books')}
            />
            <RadioButton
              title="Bookmarks"

              selected={state.product_type === 'Bookmarks'}
              onPress={() => productTypeFunc('Bookmarks')}
            />
          </View>
        </View>
      </View>
      <View key="footer">
        <View>
          <View style={{ width: wp(80), alignSelf: 'center' }}>
            <Button bold color="white" onPress={() => onSubmit()}>
              Submit
        </Button>
          </View>

        </View>
      </View>
      <ModalScreen
        visible={visible}
        onContinue={onContinue}
        {...JOIN_US.modalData}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: wp(1),
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: 20,
    textAlignVertical: 'top',
    // padding: 10,
  },
  row: {
    // width: wp(),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default JoinUs;
