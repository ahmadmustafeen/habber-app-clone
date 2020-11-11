import {BookListContainer, FilterModal} from 'components';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import useFilter from 'utils/customHooks/useFilter';
import {TitleBarWithIcon, Header} from '_components';
import {setFilterHandler} from '../../helpers/Filter';
const BooksList = (props) => {
  const {
    route: {
      params: {label, data},
    },
    navigation: {navigate},
  } = props;
  const {visible, toggleFilter} = useFilter();
  const [bookData, setBookData] = useState(data);
  const onApplyFilter = (item) => {
    console.log(item);
    console.log('data', data);
    toggleFilter();
    let filtered = setFilterHandler(bookData, ['Delectus nostrum mo']);
    console.log('filtered', filtered);
  };
  return (
    <ScrollView>
      <Header {...props} />
      <TitleBarWithIcon label={label} onIconPress={toggleFilter} />
      <BookListContainer data={bookData} {...props} />
      <FilterModal {...props} visible={visible} onApply={onApplyFilter} />
    </ScrollView>
  );
};
export default BooksList;
