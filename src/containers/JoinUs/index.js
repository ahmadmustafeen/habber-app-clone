import React, { useState } from 'react';
import { validatePhone, validateEmail } from '_helpers/Validators';
import { useDispatch } from 'react-redux';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { InputWithLabel, RadioButton, ModalScreen } from '_components';
import { withDataActions } from '_redux/actions';
import { Button, AppText } from '_components/common';
import { JOIN_US } from '_assets/data/StaticData';
import { JOINUS, REQUESTBOOKS } from '_constants/Screens';
import { SUBMIT_JOIN_US } from 'redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import { ScrollView } from 'react-native-gesture-handler';

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
    if (!state.details) {
      Alert.alert('Please Enter Details');
      return false;
    }
    if (!state.business_type) {
      Alert.alert('Please Select A Business Type');
      return false;
    }
    if (!state.product_type) {
      Alert.alert('Please Select A Product Type');
      return false;
    }
    return true;
  };
  const businessTypeFunc = (id) => {
    setStateHandler('business_type', id)
  }
  const productTypeFunc = (id) => {
    setStateHandler('product_type', id)
  }
  const onContinue = () => {
    toggleModal()
    props.navigation.goBack()
  }
  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, SUBMIT_JOIN_US));
  };
  const { navigate } = props.navigation;
  return (
    <ScrollView style={{ paddingHorizontal: 25, marginTop: 20 }}>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          style={styles.inputfield}
          placeholder="Name*"
          required
          value={state.name}
          onChangeText={(val) => setStateHandler('name', val)}
        />
        <InputWithLabel placeholder="Email*" required
          value={state.email}
          onChangeText={(val) => setStateHandler('email', val)}
        />
        <InputWithLabel placeholder="Mobile Number*" required
          value={state.phone}
          onChangeText={(val) => setStateHandler('phone', val)} />
        <AppText style={styles.businesstype}>Select Business Type*</AppText>
        <View style={styles.row}>
          <RadioButton title="Individual" business={state.business_type} onPress={() => businessTypeFunc("Individual")} />
          <RadioButton title="Corporation" business={state.business_type} onPress={() => businessTypeFunc("Corporation")} />
          <RadioButton title="Publishers" business={state.business_type} onPress={() => businessTypeFunc("Publishers")} />
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
        <AppText style={styles.businesstype}>Select Products Type*</AppText>
        <View style={styles.row}>
          <RadioButton title="Books" business={state.product_type} onPress={() => productTypeFunc("Books")} />
          <RadioButton title="Bookmarks" business={state.product_type} onPress={() => productTypeFunc("Bookmarks")} />
        </View>
      </View>
      <View key="footer">
        <Button color="white" onPress={() => onSubmit()}>
          Submit
        </Button>
      </View>
      <ModalScreen
        visible={visible}
        onContinue={onContinue}
        {...JOIN_US.modalData}
      />
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: 20,
    textAlignVertical: 'top',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

export default JoinUs;
