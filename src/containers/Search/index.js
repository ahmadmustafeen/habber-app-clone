import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput, FlatList, Image, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Screen, AppText } from '_components/common';
import { withDataActions } from '_redux/actions';
import { SEARCH_BOOKS } from '_redux/actionTypes';
import {
  BookListContainer,
  TitleBarWithIcon,
  Header,
} from '_components';
import useFilter from '_utils/customHooks/useFilter';
import { FilterModal } from '_containers/Filter';
import { useTranslation } from 'react-i18next';
import NoBookAvailbe from '../../components/NoBookAvailable';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const Search = (props) => {
  // const { t } = useTranslation(['Search']);
  const { t } = useTranslation(['Search'])
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState('');
  const { visible, toggleFilter } = useFilter();
  const dispatch = useDispatch();

  const { SearchBooksReducer } = useSelector(({ SearchBooksReducer }) => {
    return {
      SearchBooksReducer,
    };
  }, shallowEqual);
  console.log("bookkkkkk", SearchBooksReducer)
  const [filter, setFilter] = useState([])
  const onSubmit = () => {
    dispatch(withDataActions({ keyword }, SEARCH_BOOKS));
  };

  // const onApplyFilter = (item) => {
  //   console.log(item);
  //   toggleFilter();
  // };
  const onApplyFilter = (item) => {
    // filter keys in UI should be displayed from ITEM array - Ahmad
    setFilter([...item])
    toggleFilter();
    // if (!item.length) {
    //   setBookData(data);
    //   return;
    // }

    // let filtered = setFilterHandler(bookData, item);
    // setBookData(filtered);
  };
  console.log('SearchBooksReducer', SearchBooksReducer);
  return (
    <Screen noPadding>
      <View
        key="header"
        style={{ backgroundColor: colors.secondary, padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }}>
        <Header backIcon headerLeft {...props} />
        <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
          <TextInput
            style={[styles.textInput, { textAlign: I18nManager.isRTL ? "right" : "left" }]}
            placeholder={I18nManager.isRTL ? 'بحث' : 'Search'}
            onChangeText={(val) => setKeyword(val)}
            onSubmitEditing={onSubmit}
          />
          <TouchableWithoutFeedback onPress={onSubmit} >
            <Icon
              size={22}
              containerStyle={styles.iconStyle}
              // name="search1"
              // type="antdesign"
              name="search1"
              type="ant-design"
            />
          </TouchableWithoutFeedback>

        </View>
      </View>
      <View key="content">
        <View style={{ width: wp(90), alignSelf: 'center' }}>
          {(SearchBooksReducer.length > 0) &&
            <TitleBarWithIcon label={`${SearchBooksReducer.length} ${t('bookFound')}`}
              filter={filter} noIcon onIconPress={toggleFilter} />}
        </View>

        <View style={styles.filterApply}>
          {filter.map((item) =>
            <View key={item} style={[styles.filterView, { backgroundColor: colors.borderColor }]}>
              <AppText size={13} style={{ marginRight: 16 }}>
                {item}
              </AppText>
              <Image style={styles.filterCross} source={require('../../assets/images/remove.png')} onPress={() => onApplyFilter()} />
            </View>
          )}
        </View>
        {/* {(SearchBooksReducer.length > 0) && <BookListContainer data={SearchBooksReducer} product_type="book" {...props} />} */}
        {(SearchBooksReducer.length > 0) ? <BookListContainer data={SearchBooksReducer} product_type="book" {...props} />
          : <NoBookAvailbe title={I18nManager.isRTL ? 'لا يوجد شيء لعرضه هنا!' : 'Nothing to Show here!'}
            emptyy={I18nManager.isRTL ? 'أدخل شيئا للبحث' : 'Enter Something to Search'} />}

        <FilterModal {...props} visible={visible} onApply={onApplyFilter} />
      </View>


    </Screen>


  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 45,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    color: '#000000',
    backgroundColor: '#fff',
  },
  iconStyle: {
    height: '100%',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
  filterApply: {
    flexDirection: 'row',
    alignSelf: "center",
    flexWrap: "wrap",
    width: wp(90),
    justifyContent: 'center'
  },
  filterView: {
    flexDirection: 'row',
    width: wp(35),
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    paddingVertical: 10,
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: 'center'
  }
  ,
  filterCross: {
    position: "absolute",
    right: 10
  }

});

export default Search;