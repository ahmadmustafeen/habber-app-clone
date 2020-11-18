import {BookListContainer, FilterModal} from 'components';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import useFilter from 'utils/customHooks/useFilter';
import {TitleBarWithIcon, Header} from '_components';
import {setFilterHandler} from '../../helpers/Filter';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BooksList = (props) => {
  const {
    route: {
      params: {label, data, type},
    },
    navigation: {navigate},
  } = props;
  const {visible, toggleFilter} = useFilter();
  const [bookData, setBookData] = useState(data);
  const onApplyFilter = (item) => {
    //   console.log(item);
    //   console.log('data', data);
    toggleFilter();
    // let filtered = setFilterHandler(bookData, ['Delectus nostrum mo']);
    // console.log('filtered', filtered);
  };
  return (
    <ScrollView>
      <Header {...props} title={type === 'bookmarks' ? 'Bookmark' : 'Book'} />
      <View>
        <TitleBarWithIcon label={label} onIconPress={toggleFilter} />
        <BookListContainer data={bookData} {...props} type={type} />
        <FilterModal {...props} visible={visible} onApply={onApplyFilter} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    marginLeft: wp(5),
  },
});
export default BooksList;
