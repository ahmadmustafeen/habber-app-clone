import React, { useState } from 'react';
import { View, ScrollView, I18nManager, ImageBackground, Alert } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { withDataActions } from '_redux/actions';
import { InputWithLabel, ModalSelectorCustom, ModalScreen } from '_components';
import useModal from '_utils/customHooks/useModal';
import { Button, Screen } from '_components/common';
import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { ADD_ADDRESS_SAGA } from '_redux/actionTypes';
import { useTranslation } from 'react-i18next';
import { EDIT_ADDRESS } from '../../redux/actionTypes';
import { colors } from 'react-native-elements';
import { ADD_NEW_ADDRESS } from '_assets/data/StaticData';
import {
  validatePhone,
  validateEmail,
  validateIsTrue,
} from '_helpers/Validators';
import { checkIfLoading } from '../../redux/selectors';
const AddNewAddress = (props) => {
  const { visible, toggleModal } = useModal();
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const { route, navigation } = props;
  console.log(props)
  // const data = route.params.params.item.item;
  // var item = !!route.params.item ? route.params.item : ""
  // item = route.params.item;
  const item = (props.route.params ? props.route.params.item ? props.route.params.item.item : "" : "")
  const { t } = useTranslation(['AddNewAddress'])
  const [state, setState] = useState({
    address_name: (item ? item.address_name : ""),
    address_line1: (item ? item.address_line1 : ""),
    address_line2: (item ? item.address_line2 : ""),
    country_id: (item ? item.country_id : ""),
    state: (item ? item.state : ""),
    city_id: (item ? item.city_id : ""),
    phone: (item ? item.phone : ""),
    post_code: (item ? item.post_code : ""),
  });
  // const data = [
  //   { key: index++, section: true, label: 'Fruits' },
  //   { key: index++, label: 'Red Apples' },
  //   { key: index++, label: 'Cherries' },
  //   { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
  // ];

  const { FetchCountriesReducer, isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(state, ADD_ADDRESS_SAGA),
      FetchCountriesReducer: state.FetchCountriesReducer,
    };
  }, shallowEqual);
  console.log(state.country_id, "state");
  // console.log(FetchCountriesReducer, "FETCh")
  var selectedCountry = (FetchCountriesReducer.find((country) => country.id === state.country_id));
  (!selectedCountry) ? (selectedCountry = { city: [] }) : null;

  console.log("adteer", selectedCountry)
  const countries_list = FetchCountriesReducer.map((data) => ({ key: data.id, label: data.name })).map(city => { return { key: city.key, label: city.label } })
  console.log(countries_list, selectedCountry)
  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const dispatch = useDispatch();
  const { navigate } = navigation;

  const validate = () => {
    return (

      validateIsTrue(state.address_name, 'Address Name') &&
      validateIsTrue(state.country_id, "Select a Country", false) &&
      validateIsTrue(state.city_id, "Select a State", false) &&
      validateIsTrue(state.state, 'City') &&
      // validateIsTrue((state.state.length > 2), 'City') &&
      validateIsTrue(state.address_line1, 'Address') &&

      // validateIsTrue(state.address_line2, 'Address!');
      // validateIsTrue(state.post_code, 'Postal Code') &&
      validateIsTrue(((state.phone.length > 10) && (state.phone.length < 16)), "Phone Number should be between 11 digits to 15 digits", false) &&
      validateIsTrue(!!validatePhone(state.phone), 'Phone No')
    )




  };

  const AddAddress = () => {
    if (validate()) {

      item ?
        dispatch(withDataActions({ ...state, id: item.id }, EDIT_ADDRESS))
        :
        dispatch(withDataActions({ ...state, checkout: props.route.params ? true : false }, ADD_ADDRESS_SAGA))
    }


  };
  return (
    <ScrollView>

      <Header {...props} backIcon headerLeft headerImage
        title={!!(props.route.params) ? props.route.params.checkout ? "CHECKOUT" : "EDIT ADDRESS" : "Add Address"} />

      <Screen>
        <View key="header"></View>
        <View key="content">
          <InputWithLabel color={"black"}
            value={state.address_name}
            placeholder={t('addressName')}
            required
            onChangeText={(val) => setStateHandler('address_name', val)}
          />
          {/* <InputWithLabel color={"black"} placeholder="Country*" required /> */}
          <ModalSelectorCustom

            data={countries_list}

            onChangeText={value => setState({ ...state, country_id: value.key })}
            initValue={selectedCountry.name || t('country')}
            color={"gray"}

          />
          <ModalSelectorCustom
            data={selectedCountry.city}
            onChangeText={value => setState({ ...state, city_id: value.id })}
            initValue={t('state')}
            color={"gray"}





          />

          <InputWithLabel
            color={"black"}

            value={state.state}
            placeholder={t('City*')}
            required
            onChangeText={(val) => setStateHandler('state', val)}
          />
          <InputWithLabel color={"black"}
            value={state.address_line1}
            placeholder={t('Address Line 1*')}
            required
            onChangeText={(val) => setStateHandler('address_line1', val)}
          />
          <InputWithLabel color={"black"}
            value={state.address_line2}
            placeholder={t('Address Line 2*')}

            required
            onChangeText={(val) => setStateHandler('address_line2', val)}
          />
          <InputWithLabel color={"black"}
            value={state.post_code}
            placeholder={t('Postal Code*')}
            required
            onChangeText={(val) => setStateHandler('post_code', val)}
          />
          <InputWithLabel color={"black"}
            value={state.phone}
            placeholder={t('Mobile Number*')}
            required
            onChangeText={(val) => setStateHandler('phone', val)}
          />
          <ModalScreen
            // image={require("")}
            visible={visible}
            onContinue={onContinue}
            {...ADD_NEW_ADDRESS.modalData}
          />
        </View>
        <View key="footer">
          <Button primary onPress={() => AddAddress()} loading={isLoading}>
            {/* {t('Add Address')} */}
            {!!(props.route.params) ? props.route.params.checkout ? "USE THIS ADDRESS" : "Edit Address" : "Add Address"}
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default AddNewAddress;
