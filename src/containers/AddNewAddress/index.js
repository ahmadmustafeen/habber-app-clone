import React, { useState } from 'react';
import { View, ScrollView, I18nManager, ImageBackground } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { withDataActions } from '_redux/actions';
import { InputWithLabel, ModalSelectorCustom } from '_components';
import { Button, Screen } from '_components/common';
import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { ADD_ADDRESS_SAGA } from '_redux/actionTypes';
import { useTranslation } from 'react-i18next';

const AddNewAddress = (props) => {
  const { t } = useTranslation(['AddNewAddress'])
  const [state, setState] = useState({


    address_name: "",
    address_line1: "",
    address_line2: "",
    country_id: "",
    state: "",
    city_id: 4,
    phone: "",
    post_code: "",
  });
  console.log("state", state)
  // const data = [
  //   { key: index++, section: true, label: 'Fruits' },
  //   { key: index++, label: 'Red Apples' },
  //   { key: index++, label: 'Cherries' },
  //   { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
  // ];

  const { FetchCountriesReducer } = useSelector((state) => {
    return {
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
  const AddAddress = () => {
    dispatch(withDataActions(state, ADD_ADDRESS_SAGA));
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
        <Header {...props} backIcon headerLeft />
      </ImageBackground>
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
            // value={null}
            onChangeText={(value) => setState({ ...state, country_id: value.key })}
            initValue={selectedCountry.name || t('country')}
          />
          <ModalSelectorCustom
            data={selectedCountry.city}
            onChangeText={(value) => setState({ ...state, city_id: value.id })}
            initValue={t('state')}
          />

          <InputWithLabel color={"black"}
            value={state.state}
            placeholder={t('state')}
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
        </View>
        <View key="footer">
          <Button primary onPress={() => AddAddress()}>
            {t('addAddress')}
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default AddNewAddress;
