import { Alert } from 'react-native';
import { put, call, select } from 'redux-saga/effects';
import * as NavigationService from '../../../NavigationService';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { RestClient } from '_network/RestClient';
import { API_ENDPOINTS } from 'constants/Network';
import { FETCH_AD_SUCCESS, FETCH_AD_FAILURE } from '_redux/actionTypes';
import { AD_SCREEN } from '_constants/Screens';
import {
    FETCH_ARABIC_BOOKS,
    FETCH_BOOKCLUBS,
    FETCH_ENGLISH_BOOKS,
    FETCH_BOOKMARKS,
    FETCH_ADDRESS,
    SKIP_AD,
    FETCH_SITE_DETAILS,
    FETCH_CURRENCIES,
    FETCH_COUNTRIES,
    FETCH_BANNER,
    FETCH_STATIC
} from '_redux/actionTypes';
import { getItem } from '../../helpers/Localstorage';
import { ADD_TO_CART, FETCH_USER_CART_SUCCESS, RE_ADD_TO_CART } from '../actionTypes';


export function* UpdateCartPriceSagaOffline(payload) {
    let UserProfileReducer = yield getItem('@userProfile');
    UserProfileReducer = JSON.parse(UserProfileReducer)
    const { CartReducer, ArabicBooksReducer, EnglishBooksReducer, BookmarksReducer } = yield select(
        ({ CartReducer, ArabicBooksReducer, EnglishBooksReducer, BookmarksReducer }) => ({ CartReducer, ArabicBooksReducer, BookmarksReducer, EnglishBooksReducer })
    );
    console.log("CUURENCY", UserProfileReducer.currency.iso)
    const CombinedReducer = [...ArabicBooksReducer, ...EnglishBooksReducer];

    const Productbooks = CartReducer.book.map((book) => {
        let price = (CombinedReducer.find(bookss => book.id === bookss.id).prices.find((id) => UserProfileReducer.currency.id === id.id).price)
        price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

        return {
            ...book,
            cart_price: price * book.cart_quantity,
            price: price
        }
    })
    console.log(Productbooks, "THIS")
    const Productbookmarks = CartReducer.bookmark.map((book) => {
        let price = (BookmarksReducer.find(bookss => book.id === bookss.id).prices.find((id) => UserProfileReducer.currency.id === id.id).price)
        price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

        return {
            ...book,
            cart_price: price * book.cart_quantity,
            price: price
        }
    })
    let total_price = 0
    Productbookmarks.map(bookmark => total_price += bookmark.cart_price)
    Productbooks.map(bookmark => total_price += bookmark.cart_price)
    var objCArt = {
        book: Productbooks,
        bookmark: Productbookmarks,
        total_price: total_price,
    }

    try {
        yield put({ type: FETCH_USER_CART_SUCCESS, payload: null })
        yield put({ type: FETCH_USER_CART_SUCCESS, payload: objCArt })
        yield put({ type: RE_ADD_TO_CART, payload: objCArt })
        // console.log("UpdateCartPriceSagaOffline", CombinedReducer);

    } catch (error) {
        console.log('UpdateCartPriceSagaOffline ERROR: ', error);
    }
}
