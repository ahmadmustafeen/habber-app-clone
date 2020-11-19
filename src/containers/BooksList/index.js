import {BookListContainer} from 'components';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import useFilter from 'utils/customHooks/useFilter';
import {TitleBarWithIcon, Header} from '_components';
import {setFilterHandler} from '../../helpers/Filter';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FilterModal} from '_containers/Filter';
const BooksList = (props) => {
  const {label, data, product_type} = props.route.params;
  const {visible, toggleFilter} = useFilter();
  const [bookData, setBookData] = useState(data);
  const onApplyFilter = (item) => {
    // filter keys in UI should be displayed from ITEM array - Ahmad
    toggleFilter();
    if (!item.length) {
      setBookData(data);
      return;
    }
    let filtered = setFilterHandler(bookData, item);
    setBookData(filtered);
  };
  return (
    <ScrollView>
      <Header
        {...props}
        title={product_type === 'bookmark' ? 'Bookmark' : 'Book'}
      />
      <View>
        <TitleBarWithIcon label={label} onIconPress={toggleFilter} />
        <BookListContainer
          data={bookData}
          {...props}
          product_type={product_type}
        />
        <FilterModal {...props} visible={visible} onApply={onApplyFilter} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default BooksList;
