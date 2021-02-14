import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput, FlatList, Image, I18nManager, Keyboard } from 'react-native';
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

import Loader from '_components/Loader';
import useFilter from '_utils/customHooks/useFilter';
import { FilterModal } from '_containers/Filter';
import { useTranslation } from 'react-i18next';
import NoBookAvailbe from '../../components/NoBookAvailable';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { withoutDataActions } from '../../redux/actions';
import { SEARCH_BOOKS_SUCCESS } from '../../redux/actionTypes';

import { setFilterHandler } from '../../helpers/Filter';
import { checkIfLoading } from '../../redux/selectors';
import { FilterChip } from '../../components';


const Search = (props) => {
  // const { t } = useTranslation(['Search']);
  const { t } = useTranslation(['Search'])
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState('');
  const { visible, toggleFilter } = useFilter();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState([])


  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(state, SEARCH_BOOKS),

    };
  }, shallowEqual);

  const { SearchBooksReducer } = useSelector(({ SearchBooksReducer }) => {
    return {
      SearchBooksReducer,
    };
  }, shallowEqual);
  const [bookData, setBookData] = useState(SearchBooksReducer);

  const onSubmit = () => {
    dispatch(withDataActions({ keyword }, SEARCH_BOOKS))
  };

  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }

  // setBookData[];
  useEffect(() => {
    setBookData(SearchBooksReducer)
    console.log("THIS IS USE EFFECT", bookData)

  }, [SearchBooksReducer])


  useEffect(() => {
    dispatch(withDataActions([], SEARCH_BOOKS_SUCCESS))
  }, [])
  console.log("empty", SearchBooksReducer)

  const onApplyFilter = (item) => {
    // filter keys in UI should be displayed from ITEM array - Ahmad
    setFilter([...item]);
    toggleFilter();
    if (item.length === 0) {
      setBookData(SearchBooksReducer);
      return;
    }
    else {

      let filtered = setFilterHandler(SearchBooksReducer, item);
      setBookData(filtered);
    }
  };
  console.log(bookData, "DATA")
  const removeFilter = (deleteFilter) => {
    var filtered = filter.filter(function (item) { return item !== deleteFilter; });
    setFilter(filtered);
    if (!filtered.length) {
      setBookData(SearchBooksReducer);
      return;
    }
    else {
      let filtereds = setFilterHandler(SearchBooksReducer, filtered);
      setBookData(filtereds)
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='always'>

      <Loader loading={isLoading} />
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
            blurOnSubmit={true}
            keyboardType='default'

          />
          <TouchableWithoutFeedback

          >
            <Icon
              size={22}
              containerStyle={styles.iconStyle}
              // name="search1"
              // type="antdesign"
              name="search1"
              type="ant-design"
              onPress={onSubmit}
            />
          </TouchableWithoutFeedback>
          {/* <Icon
            size={22}
            containerStyle={styles.iconStyle}
            // name="search1"
            // type="antdesign"
            name="search1"
            type="ant-design"
            onPress={onSubmit}
          /> */}

        </View>
      </View>
      <View key="content">
        <View style={{ width: wp(90), alignSelf: 'center' }}>
          {(SearchBooksReducer.length > 0) &&
            <TitleBarWithIcon label={`${bookData.length} ${t('bookFound')}`}
              filter={filter} noIcon onIconPress={toggleFilter} centerLine />}
        </View>

        {/* <View style={styles.filterApply}>
          {filter.map((item) =>
            <View key={item} style={[styles.filterView, { backgroundColor: colors.borderColor }]}>
              <AppText size={13} style={{ marginRight: 16 }}>
                {item}
              </AppText>
              <Image style={styles.filterCross} source={require('../../assets/images/remove.png')} onPress={() => onApplyFilter() } />
            </View>
          )}
        </View> */}
        <FilterChip filter={filter} selectedFilter={filter} onIconPress={() => onApplyFilter()} onCrossPress={(coming) => removeFilter(coming)} />

        {/* {(bookData.length > 0) && <BookListContainer data={bookData} product_type="book" {...props} />} */}
        {(bookData.length > 0) ? <BookListContainer data={bookData} product_type="book" {...props} />
          : <NoBookAvailbe title={I18nManager.isRTL ? 'لا يوجد شيء لعرضه هنا!' : 'Nothing to Show here!'}
            emptyy={I18nManager.isRTL ? 'أدخل شيئا للبحث' : 'Enter Something to Search'} />}

        <FilterModal {...props}
          filters={filter} visible={visible} onApply={onApplyFilter} />
      </View>


    </ScrollView>


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
    right: 0,
    paddingRight: 15,
    width: wp(15),
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