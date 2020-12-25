import { BookListContainer, FilterChip } from '_components';
import React, { useState } from 'react';
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

const BooksList = (props) => {
  const [filter, setFilter] = useState([]);
  const { label, data, product_type } = props.route.params;
  const { visible, toggleFilter } = useFilter();
  const [bookData, setBookData] = useState(data);
  const onApplyFilter = (item) => {
    // filter keys in UI should be displayed from ITEM array - Ahmad
    setFilter([...item]);
    toggleFilter();
    if (!item.length) {
      setBookData(data);
      return;
    }
    let filtered = setFilterHandler(bookData, item);
    setBookData(filtered);
  };
  const { colors } = useTheme();
  console.log(props);
  return (
    <Screen noPadding>
      <View key='header'>
        <ImageBackground
          style={{
            height: hp(21),
            paddingHorizontal: wp(3),
            paddingBottom: hp(8),
            marginBottom: hp(1),
            justifyContent: 'flex-end',
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
          resizeMode='stretch'
          source={require('_assets/images/header.png')}>

          <Header {...props}
            subheading
            headerLeft={(
              <Icon
                onPress={() => props.navigation.goBack()}
                color={colors.primary}
                name="leftcircleo"
                type="ant-design"
              />)}
            title={
              `${label[0].toUpperCase()}${label.slice(1).toLowerCase()}`
            } />


        </ImageBackground>

      </View>

      <View key="content">
        {
          product_type === 'book'
          &&
          <View style={{ width: wp(90), alignSelf: 'center', }}>
            <TitleBarWithIcon label={label} noIcon filter={filter} onIconPress={toggleFilter} centerLine />
          </View>
        }

        <FilterChip filter={filter} selectedFilter={filter} onIconPress={() => onApplyFilter()} />
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
