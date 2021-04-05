import React, { useEffect, useState } from 'react';
import {
  validatePhone,
  validateEmail,
  validateIsTrue,
} from '_helpers/Validators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { checkIfLoading } from '../../redux/selectors';
import { BackHandler } from 'react-native';
import { Screen } from '../../components/common';
import { Keyboard } from 'react-native';
import Loader from '../../components/Loader';
const JoinUs = (props) => {




  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(state, SUBMIT_JOIN_US),
    };
  }, shallowEqual);

  const { t } = useTranslation(['JoinUs'])
  const { visible, toggleModal } = useModal();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    details: '',
    message: '',
    phone: '',
    business_type: '',
    product_type: new Set(),
  });
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

  const setStateHandler = (key, val) => {
    if (key === 'email' || key === 'phone') {
      val = val.replace(" ", "")
    }
    setState({ ...state, [key]: val });
  };
  // const validate = () => {
  //   if (!state.name) {
  //     Alert.alert('Please Enter Name');
  //     return false;
  //   }
  //   if (!validateEmail(state.email)) {
  //     Alert.alert('Invalid Email');
  //     return false;
  //   }

  //   if (!validatePhone(state.phone)) {
  //     Alert.alert('Invalid Phone Number');
  //     return false;
  //   }
  //   validateIsTrue(state.details, 'Details');
  //   validateIsTrue(state.business_type, 'Business Type');
  //   validateIsTrue(state.product_type, 'Product Type');

  //   return true;
  // };



  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    let check = false;
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);
  const [click, setClick] = useState(false)
  const validate = () => {
    // Alert.alert(state.details.trim().length)
    return (
      validateIsTrue(state.name, `${t('Please')} ${t('name')}`, false, t('ok')) &&
      validateIsTrue(state.email, `${t('Please')} ${t('email')}`, false, t('ok')) &&
      validateIsTrue(validateEmail(state.email), I18nManager.isRTL ? "يرجى إدخال البريد الإلكتروني الصحيح!" : "Please enter a valid email!", false, t('ok')) &&
      validateIsTrue(((state.phone.length > 10) && (state.phone.length < 16)),
        I18nManager.isRTL ? "يجب أن يتراوح رقم الهاتف بين 11 رقمًا و 15 رقمًا" : "Phone Number should be between 11 digits to 15 digits", false) &&
      validateIsTrue(!!validatePhone(state.phone) && !isNaN(parseFloat(state.phone)), `${t('Please')} ${t('mobileNumber')}`, false, t('ok')) &&
      validateIsTrue(state.business_type, `${t('Please')} ${t('selectBusinessType')}`, false, t('ok')) &&
      validateIsTrue((state.details.trim().length), `${t('Please')} ${t('details')}`, false, t('ok')) &&
      validateIsTrue(state.product_type.size, I18nManager.isRTL ? 'الرجاء تحديد نوع منتج واحد على الأقل' : 'Please select atleast one Product Type', false, t('ok'))
    )




  };
  const businessTypeFunc = (id) => {
    setStateHandler('business_type', id);
  };
  const productTypeFunc = (val) => {
    state.product_type.has(val) ? state.product_type.delete(val) : state.product_type.add(val);
    setState({ ...state, product_type: new Set(state.product_type) });
    // setStateHandler('product_type', id);
  };
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const onSubmit = () => {
    // Alert.alert(((state.details.trim().length) > 0).toString())
    if (validate() && !click) {
      setClick(true)
      dispatch(withDataActions(state, SUBMIT_JOIN_US));
    }
  };
  const { navigate } = props.navigation;
  const { colors } = useTheme()
  return (
    <Screen noPadding>
      <View key="header">
        <Header {...props}
          headerImage
          headerLeft
          backIcon
        />
      </View>

      <View key="content" style={styles.content}>
        <Loader loading={isLoading} />
        <InputWithLabel
          color={'black'}
          style={styles.inputfield}
          placeholder={t('Namestaric')}
          required
          value={state.name}
          onChangeText={(val) => setStateHandler('name', val)}
        />
        <InputWithLabel
          placeholder={t('emailstaric')}
          required
          color={'black'}
          value={state.email}
          onChangeText={(val) => setStateHandler('email', val)}
        />
        <InputWithLabel
          placeholder={t('mobileNumberstaric')}
          required
          color={'black'}
          value={state.phone}
          onChangeText={(val) => setStateHandler('phone', val)}
        />
        <View style={{ padding: wp(4) }}>
          <AppText style={styles.businesstype}>{t('selectBusinessTypestaric')}</AppText>
          <View style={styles.row}>
            <RadioButton
              title={t('individual')}
              selected={state.business_type === 'individual'}
              onPress={() => businessTypeFunc('individual')}
            />
            <RadioButton
              title={t('corporations')}
              selected={state.business_type === 'corporations'}
              onPress={() => businessTypeFunc('corporations')}
            />
            <RadioButton
              title={t('publishers')}
              selected={state.business_type === `Publishers`}
              onPress={() => businessTypeFunc('Publishers')}
            />
          </View>

        </View>

        <TextInput
          style={[styles.textArea, I18nManager.isRTL && { textAlign: 'right' }]}
          underlineColorAndroid="transparent"
          placeholder={t('detailsestaric')}
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
          value={state.details}
          onChangeText={(val) => setStateHandler('details', val)}
        />
        <View style={{ padding: wp(4) }}>
          <AppText style={styles.businesstype}>{t("selectProductTypestaric")}</AppText>
          <View style={styles.row}>
            <RadioButton
              title={t('books')}
              selected={state.product_type.has("Books")}
              onPress={() => productTypeFunc('Books')}
            />
            <RadioButton
              title={t('bookmarks')}
              selected={state.product_type.has("Bookmarks")}
              // selected={state.product_type === 'Bookmarks'}
              onPress={() => productTypeFunc('Bookmarks')}
            />
          </View>
        </View>
        <ModalScreen
          visible={visible}
          onContinue={onContinue}
          {...JOIN_US.modalData}
        />

        <View style={{ marginBottom: hp(5) }}>

          <View style={{ width: wp(80), alignSelf: 'center' }}>
            <Button bold color="white" onPress={() => onSubmit(click)} loading={isLoading}>
              {t('submit')}
            </Button>

          </View>
        </View>
      </View>

    </Screen >
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
    paddingLeft: 15
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
