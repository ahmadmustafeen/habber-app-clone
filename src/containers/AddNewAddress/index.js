import React, { useEffect, useState } from 'react';
import { View, ScrollView, Keyboard, I18nManager, ImageBackground, Alert } from 'react-native';

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


  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }



  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);



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

  const { FetchCountriesReducer, isLoading, isLoading2 } = useSelector((state) => {
    return {
      isLoading2: checkIfLoading(state, EDIT_ADDRESS),
      isLoading: checkIfLoading(state, ADD_ADDRESS_SAGA),
      FetchCountriesReducer: state.FetchCountriesReducer,
    };
  }, shallowEqual);
  var selectedCountry = (FetchCountriesReducer.find((country) => country.id === state.country_id));
  (!selectedCountry) ? (selectedCountry = { city: [] }) : null;

  const countries_list = FetchCountriesReducer.map((data) => ({ key: data.id, label: data.name })).map(city => { return { key: city.key, label: city.label } })
  console.log(countries_list, selectedCountry)
  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const city = selectedCountry.city.find(city => city.id == state.city_id);
  const validate = () => {
    return (

      validateIsTrue(state.address_name, `${t('Please')}  ${t('addressName')}`, false,) &&
      validateIsTrue(state.country_id, `${t('Please')}  ${t('country')}`, false, t('ok')) &&
      validateIsTrue(state.city_id, `${t('Please')}  ${t('state')}`, false, t('ok')) &&
      validateIsTrue(state.state, `${t('Please')}  ${t('city')}`, false, t('ok')) &&
      // validateIsTrue((state.state.length > 2), 'City') &&
      validateIsTrue(state.address_line1, `${t('Please')}  ${t('address')}`, false, t('ok')) &&

      // validateIsTrue(state.address_line2, 'Address!');
      // validateIsTrue(state.post_code, 'Postal Code') &&
      validateIsTrue(((state.phone.length > 10) && (state.phone.length < 16)),
        `${t('Please')}  ${t('phoneValidation')}`, false) &&
      validateIsTrue(!!validatePhone(state.phone), `${t('Please')}  ${t('mobileNumber')}`, false, t('ok'))
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

      <Header {...props} backIcon headerLeft headerImage noCart
        noSearch={!!(props.route.params) ? props.route.params.checkout ? true : null : null}
        noCart={!!(props.route.params) ? props.route.params.checkout ? true : null : null}
        title={!!(props.route.params) ? props.route.params.checkout ? (I18nManager.isRTL ? "الدفع" : "CHECKOUT") : (I18nManager.isRTL ? "تعديل العنوان" : "EDIT ADDRESS") : (I18nManager.isRTL ? "اضف عنوان" : "Add Address")}
        title={!!(props.route.params) ? props.route.params.checkout ? (I18nManager.isRTL ? "الدفع" : "CHECKOUT") : (I18nManager.isRTL ? "تعديل العنوان" : "EDIT ADDRESS") : (I18nManager.isRTL ? "اضف عنوان" : "Add Address")} />

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
            initValue={city ? city.label : false || t('state')}
            color={"gray"}





          />

          <InputWithLabel
            color={"black"}

            value={state.state}
            placeholder={t('city')}
            required
            onChangeText={(val) => setStateHandler('state', val)}
          />
          <InputWithLabel color={"black"}
            value={state.address_line1}
            placeholder={t('addressLine1')}
            required
            onChangeText={(val) => setStateHandler('address_line1', val)}
          />
          <InputWithLabel color={"black"}
            value={state.address_line2}
            placeholder={t('addressline2')}

            required
            onChangeText={(val) => setStateHandler('address_line2', val)}
          />
          <InputWithLabel color={"black"}
            value={state.post_code}
            placeholder={t('postalCode')}
            required
            onChangeText={(val) => setStateHandler('post_code', val)}
          />
          <InputWithLabel color={"black"}
            value={state.phone}
            placeholder={t('mobileNumber')}
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
          <Button primary color={"white"} onPress={() => AddAddress()} loading={isLoading || isLoading2} bold>
            {/* {t('Add Address')} */}
            {!!(props.route.params) ? props.route.params.checkout ?
              I18nManager.isRTL ? "استخدم هذا العنوان" : "USE THIS ADDRESS" : I18nManager.isRTL ? "تعديل العنوان" : "Edit Address" : t('addAddress')}
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default AddNewAddress;
