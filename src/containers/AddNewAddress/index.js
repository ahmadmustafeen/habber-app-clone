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
    address_name: '',
    country: {},
    state: '',
    city: '',
    address_line1: '',
    address_line2: '',
    phone: '',
    post_code: '',
  });

  var index = 0;
  const { FetchCountriesReducer } = useSelector((state) => {
    return {
      FetchCountriesReducer: state.FetchCountriesReducer,
    };
  }, shallowEqual);
  console.log(FetchCountriesReducer);

  const countries_list = FetchCountriesReducer.map((data) => ({ key: data.iso, label: data.nicename }))
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
            value={state.country_id}
            initValue={state.country.label || t('country')}
            onChangeText={(value) => setState({ ...state, country: value })}
          />
          <ModalSelectorCustom
            data={countries_list}
            //  onChangeText={(value) => setState({ ...state, country_id: value.key })}
            initValue={t('state')}
          />

          <InputWithLabel color={"black"}
            value={state.city}
            placeholder={t('city')}
            required
            onChangeText={(val) => setStateHandler('city', val)}
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
