import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
  DashboardComponent,
  ThumbnailClub,
} from '../../components';
import {CART_SCREEN} from '../../constants/Screens';
import {
  ADD_TO_CART,
  FETCH_RELATED_BOOKS,
  UPDATE_FAVOURITE,
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
} from '_redux/actionTypes';
import {
  withDataActions,
  withoutDataActions,
} from '_redux/actions/GenericActions';

import {useFocusEffect, useTheme} from '@react-navigation/native';

const BookDetails = (props) => {
  const {
    route: {params},
    navigation: {navigate},
  } = props;
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const {FetchRelatedBookList, FavouriteReducer} = useSelector((state) => {
    return {
      FetchRelatedBookList: state.FetchRelatedBookList,
      FavouriteReducer: state.FavouriteReducer,
    };
  });

  const [value, setValue] = useState(0);

  const {
    title,
    id: product_id,
    total_pages,
    description,
    cover_type,
    quantity,
    price,
    image,
    type,
    isbn,
    author_name,
  } = params;

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
  };
  const isFavourite = FavouriteReducer[type].some(
    (el) => el.product_id === product_id,
  );

  useEffect(() => {
    dispatch(withDataActions({product_id}, FETCH_RELATED_BOOKS));
  }, []);

  useEffect(() => {
    return function onUnmount() {
      dispatch(
        withDataActions(
          {product_id, type},
          isFavourite ? ADD_TO_FAVOURITE : REMOVE_FAVOURITE,
        ),
      );
    };
  }, [isFavourite]);

  const handleFavouriteClick = () => {
    dispatch(withDataActions({product_id, type}, UPDATE_FAVOURITE));
  };

  return (
    <Screen noPadding contentPadding>
      <View key="header">
        <ImageBackground
          style={{
            flex: 1,
            paddingHorizontal: 10,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
          source={require('_assets/images/book-detail.png')}>
          <Header {...props} noTitle color={colors.secondary} />
          <BookDetailsCard
            onClickFavourite={handleFavouriteClick}
            favourite={isFavourite}
            {...params}
          />
        </ImageBackground>
      </View>
      <View key="content">
        <HorizontalRow />
        <View>
          <AppText bold size={15} primary>
            ISBN: {isbn}
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
        <DashboardComponent
          data={FetchRelatedBookList}
          label="You may like"
          renderComponent={(item) => <ThumbnailClub url={item.image} />}
        />
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
