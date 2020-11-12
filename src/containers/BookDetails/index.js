import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
} from '../../components';
import {CART_SCREEN} from '../../constants/Screens';
import {ADD_TO_CART} from '_redux/actionTypes';
import {
  withDataActions,
  withoutDataActions,
} from '_redux/actions/GenericActions';

import {useTheme} from '@react-navigation/native';

const BookDetails = (props) => {
  const {
    route: {params},
    navigation: {navigate},
  } = props;
  const {colors} = useTheme();
  console.log('26', params);
  const dispatch = useDispatch();
  const {CartReducer} = useSelector((state) => {
    return {
      CartReducer: state.CartReducer,
    };
  }, shallowEqual);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      checkExistance();
    });
  });

  const [value, setValue] = useState(0);

  const {
    title,
    product_id,
    total_pages,
    description,
    cover_type,
    quantity,
    price,
    image,
    type,
    author_name,
  } = params;
  const checkExistance = () => {
    CartReducer.product.map((book) => {
      book.isbn === product_id && setValue(book.quantity);
    });
  };

  const add = (prevValue) => {
    if (prevValue === quantity) {
      return false;
    } else {
      setValue(prevValue + 1);
    }
  };
  const subtract = (prevValue) => {
    if (prevValue === 0) {
      return false;
    } else {
      setValue(prevValue - 1);
    }
  };
  const addtocart = () => {
    dispatch(
      withDataActions(
        {
          product_id,
          quantity: value,
          price,
          description,
          title,
          image,
          author_name,
          product_type: type,
        },
        ADD_TO_CART,
      ),
    );
    // dispatch(withoutDataActions(ADD_TO_CART));
    props.navigation.navigate(CART_SCREEN);
  };
  console.log('BookDetails', params);
  return (
    <Screen noPadding contentPadding>
      <View key="header">
        <Header {...props} title={title} />
      </View>
      <View key="content">
        <BookDetailsCard {...params} />
        <HorizontalRow />
        <View>
          <AppText bold size={15} primary>
            ISBN: {product_id}
          </AppText>
          <AppText bold size={15}>
            Pages: {total_pages}
          </AppText>
          <AppText bold size={15}>
            Type of Cover: {cover_type}
          </AppText>
          <AppText bold size={15}>
            Genre: Romance|Thriller|Mystery
          </AppText>
        </View>
        <HorizontalRow />
        <View style={{marginTop: 20}}>
          <AppText bold style={{marginBottom: 10}}>
            Description:
          </AppText>
          <AppText size={14}>{description}</AppText>
        </View>
      </View>
      <View key="footer">
        <View style={styles.counter}>
          {quantity && (
            <Counter
              onIncrement={() => add(value)}
              onDecrement={() => subtract(value)}
              value={value}
            />
          )}
        </View>

        <Button
          bold
          color={colors.white}
          secondary
          onPress={() => value && addtocart()}>
          {quantity ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default BookDetails;
