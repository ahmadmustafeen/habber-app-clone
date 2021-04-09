import { BookListContainer, FilterChip } from '_components';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  I18nManager,
} from 'react-native';
import useFilter from 'utils/customHooks/useFilter';
import { TitleBarWithIcon, Header } from '_components';
import { setFilterHandler } from '../../helpers/Filter';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FilterModal } from '_containers/Filter';
import { useTheme } from '@react-navigation/native';
import { AppText, Screen } from 'components/common';
import { Icon } from 'react-native-elements';
import { BackHandler } from 'react-native';
import { withoutDataActions } from '../../redux/actions';
import { FETCH_ARABIC_BOOKS, FETCH_ARABIC_BOOKS_SUCCESS, FETCH_BOOKCLUBS, FETCH_BOOKCLUBS_SUCCESS, FETCH_BOOKMARKS, FETCH_BOOKMARKS_SUCCESS, FETCH_ENGLISH_BOOKS, FETCH_ENGLISH_BOOKS_SUCCESS } from '../../redux/actionTypes';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const BooksList = (props) => {

  const { label, labelOriginal, data, product_type } = props.route.params;
  const [bookData, setBookData] = useState([]);
  const handleBackButton = () => {
    // dispatch(withoutDataActions(FETCH_ENGLISH_BOOKS))
    // dispatch(withoutDataActions(FETCH_ARABIC_BOOKS))
    // dispatch(withoutDataActions(FETCH_BOOKMARKS))
    // // dispatch(withoutDataActions(FETCH_BANNER))
    // dispatch(withoutDataActions(FETCH_BOOKCLUBS))
    props.navigation.goBack()
    return true;
  };
  const dispatch = useDispatch()
  const [filter, setFilter] = useState([]);
  const refreshData = () => {
    dispatch(withoutDataActions(FETCH_ENGLISH_BOOKS))
    dispatch(withoutDataActions(FETCH_ARABIC_BOOKS))
    dispatch(withoutDataActions(FETCH_BOOKMARKS))
    dispatch(withoutDataActions(FETCH_BOOKCLUBS))

    setFilter([])


  }

  useEffect(() => {
    refreshData()


    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const {
    UserProfileReducer,
    EnglishBooksReducer,
    ArabicBooksReducer,
    BookmarksReducer,
    BookClubReducer,
    FetchSiteReducer,
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer,
      EnglishBooksReducer: state.EnglishBooksReducer,
      ArabicBooksReducer: state.ArabicBooksReducer,
      BookmarksReducer: state.BookmarksReducer,
      BookClubReducer: state.BookClubReducer,
    };
  }, shallowEqual);

  useEffect(() => {
    console.log(label, "label");
    switch (labelOriginal) {
      case 'englishBook': {
        setBookData(EnglishBooksReducer)
        break;
      }
      case 'arabicBook': {
        setBookData(ArabicBooksReducer)
        break
      };
      case 'bookclub': {
        setBookData(BookClubReducer)
        break
      };
      case 'bookmark': {
        setBookData(BookmarksReducer)
        break
      };
    }
  }, [EnglishBooksReducer, ArabicBooksReducer, BookClubReducer, BookmarksReducer])

  const { visible, toggleFilter } = useFilter();

  const removeFilter = (deleteFilter) => {
    var filtered = filter.filter(function (item) { return item !== deleteFilter; });
    setFilter(filtered);
    if (!filtered.length) {
      setBookData(data);
      return;
    }
    else {
      let filtereds = setFilterHandler(data, filtered);
      setBookData(filtereds)
    }
  }
  const onApplyFilter = (item) => {
    // filter keys in UI should be displayed from ITEM array - Ahmad
    setFilter([...item]);
    toggleFilter();
    if (!item.length) {
      setBookData(data);
      return;
    }
    let filtered = setFilterHandler(data, item);
    setBookData(filtered);
  };
  const { colors } = useTheme();

  return (
    <Screen noPadding refresh={refreshData}>
      <View key='header'>

        <Header {...props}
          subheading
          headerImage
          backIcon
          headerLeft
          // headerLeft={(
          //   <Icon
          //     onPress={() => props.navigation.goBack()}
          //     color={colors.primary}
          //     name="leftcircleo"
          //     type="ant-design"
          //   />)}
          capitalize
          title={

            `${label[0].toUpperCase()}${label.slice(1).toLowerCase()}`
          }
        />


      </View>

      <View key="content">
        {
          product_type === 'book'
          &&
          <View style={{ width: wp(90), alignSelf: 'center', }}>
            <TitleBarWithIcon label={label} noIcon filter={filter} onIconPress={toggleFilter} centerLine={true} />
          </View>
        }

        <FilterChip filter={filter} selectedFilter={filter} onIconPress={() => onApplyFilter()} onCrossPress={(coming) => removeFilter(coming)} />
        {/* <View style={styles.filterApply}>

          {filter.map((item) =>
            <View key={item} style={[styles.filterView, { backgroundColor: colors.borderColor }]}>
              <AppText size={13} style={{ marginRight: 16 }}>
                {item}
              </AppText>
              <Image style={styles.filterCross} source={require('../../assets/images/remove.png')} onPress={() => onApplyFilter()} />
            </View>
          )}
        </View> */}
        {/* <View style={{ alignSelf: 'flex-end', width: wp(93) }}> */}
        <BookListContainer
          data={bookData}
          {...props}
          product_type={product_type}
        />
        {/* </View> */}

        <FilterModal
          {...props}
          filters={filter}
          visible={visible}
          onToggle={toggleFilter}
          onApply={onApplyFilter}
        />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  filterApply: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    width: wp(90),
    justifyContent: 'center',
  },
  filterView: {
    flexDirection: 'row',
    width: wp(35),
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    paddingVertical: 10,
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCross: {
    position: 'absolute',
    right: 10,
  },
});
export default BooksList;
