import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, I18nManager, FlatList, TouchableOpacity } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { ADD_NEW_ADDRESS, EDIT_PROFILE } from '_constants/Screens';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from 'components/Loader';
import { checkIfLoading } from 'redux/selectors';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AddressCard, } from '_components'
import { FETCH_ADDRESS } from 'redux/actionTypes';
import { useTheme } from '@react-navigation/native';
import AddNewAddress from '../AddNewAddress';
import { useTranslation } from 'react-i18next';
import { withDataActions } from '../../redux/actions';
import { DELETE_ADDRESS, EDIT_ADDRESS } from '../../redux/actionTypes';
import UserProfileReducer from '../../redux/reducers/UserProfileReducer';
import { BackHandler } from 'react-native';
const MyAddressBook = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const dispatch = useDispatch();
  const { t } = useTranslation(['MyAddressBook'])
  const { navigate } = props.navigation;

  const { AddressReducer, isLoading } = useSelector((state) => {
    return {
      AddressReducer: state.AddressReducer,
      isLoading: checkIfLoading(state, FETCH_ADDRESS),
    };
  }, shallowEqual);
  console.log("AddressReducer", AddressReducer)


  const { first_name, last_name, email, profile_pic } = useSelector(
    ({ UserProfileReducer }) => UserProfileReducer,
    shallowEqual,
  );
  // AddressReducer.entries((item) => item)
  const MyAddressBook = (props) => {
    console.log(props.item);
    return (
      <>
        <AppText size={15} primary style={styles.spacebtwaddresses}>
          {props.item.address_name}
        </AppText>
        <AppText size={15} style={styles.spacebtwaddresses}>
          {`${props.item.address_line1}${props.item.address_line2}`}
        </AppText>
      </>
    )
  }
  console.log(UserProfileReducer, "adasdas")
  const { colors } = useTheme()
  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props} title={t('myProfile')} headerImage />

      </View>
      <View key="content">
        <Loader loading={isLoading} />
        <View style={styles.profiletop}>
          <View style={[styles.imgContainer, { borderColor: colors.borderColor }]}>
            <Image
              style={styles.image}
              source={(!!profile_pic) ? { uri: profile_pic } : require('_assets/images/noUser.png')}
            />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <AppText bold small style={styles.txt}>
              {`${first_name} ${last_name}`}
            </AppText>
            <AppText small style={styles.txt}>
              {email}
            </AppText>
          </View>
          <TouchableOpacity style={{ position: 'absolute', right: wp(2.5), top: hp(-2.0) }} onPress={() => navigate(EDIT_PROFILE)}>
            {I18nManager.isRTL ?
              <Image source={require('../../assets/images/editbtnAR.png')} /> :
              <Image source={require('../../assets/images/editbtn.png')} />}
          </TouchableOpacity>


        </View>
        <HorizontalRow style={{ borderBottomWidth: hp(0.1), borderBottomColor: colors.borderColor }} />
        <View style={styles.addressbookview}>
          <View style={styles.addressbook}>
            <AppText size={17} style={styles.addressbookheading}>
              {t('myAddressBook')}
            </AppText>
            <HorizontalRow />

            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical
              data={AddressReducer}
              keyExtractor={(item, index) => index.toString() + item}
              renderItem={(item) => <AddressCard
                onEditPress={() => navigate('AddNewAddress', { screen: ADD_NEW_ADDRESS, item })}
                onTrashPress={() => dispatch(withDataActions(item, DELETE_ADDRESS))}
                // onEditPress={() => props.navigation.navigate('MyProfile', { screen: ADD_NEW_ADDRESS, params: { item } })}
                // onEditPress={() => console.log("EDIT")}
                actionButton
                item={item.item}
              />
              }
              ListEmptyComponent={() => (
                <View>
                  <AppText> {t('noAddressAvailable')}</AppText>
                </View>
              )}
              ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
            />
          </View>
          <Button
            add
            fontSize={17}
            primary
            onPress={() => navigate(ADD_NEW_ADDRESS)}>
            {t('addNewAddress')}
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    marginLeft: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    alignSelf: 'center',
    width: wp(85),
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: hp(6),
  },
  editbtn: {
    backgroundColor: '#c27e12',
    width: 100,
    height: 30,
    position: 'absolute',
    right: 10,
    top: -10,
    color: 'black',
    borderRadius: 400 / 2,
  },
  txt: {
    marginLeft: 10,
    marginTop: 5,
  },
  addressbookheading: {
    marginBottom: 15,
    marginLeft: 15,
  },
  addressbook: {
    borderRadius: 5,
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 2.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
});

export default MyAddressBook;
