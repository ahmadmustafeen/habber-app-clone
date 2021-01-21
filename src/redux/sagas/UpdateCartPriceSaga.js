import { Alert } from 'react-native';
import { put, call, select, all } from 'redux-saga/effects';
import {
    RE_ADD_TO_CART_FAILURE,
    RE_ADD_TO_CART_SUCCESS,
    FETCH_USER_CART,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { CART_SCREEN } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import RNRestart from 'react-native-restart';
import { CHECKOUT } from '../../constants/Screens';
import { getItem } from '../../helpers/Localstorage';
import { FETCH_USER_CART_SUCCESS } from '../actionTypes';

export function* UpdateCartPriceSaga({ type, payload }) {
    try {




        const { CartReducer, UserProfileReducer, EnglishBooksReducer, ArabicBooksReducer } = yield select(
            ({ CartReducer, UserProfileReducer, EnglishBooksReducer, ArabicBooksReducer }) => {
                return { CartReducer, UserProfileReducer, EnglishBooksReducer, ArabicBooksReducer };
            },
        );
        console.log(CartReducer, "THIS IS IN  CART")
        if (CartReducer.length === 0) {
            return false
        }

        let books = [...ArabicBooksReducer, ...EnglishBooksReducer]
        let userProfile = yield getItem('@userProfile');
        userProfile = JSON.parse(userProfile);
        console.log(books, "SHOULD M<ATCH")
        const productBook = CartReducer.book.map((book) => {
            let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
            price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

            return {
                product_id: book.id,
                product_type: "book",
                quantity: book.cart_quantity,
                price: price * book.cart_quantity,
            }
        })
        console.log(productBook, "found")
        const productBookmark = CartReducer.bookmark.map((book) => {
            let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
            price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

            return {
                product_id: book.id,
                product_type: "book",
                quantity: book.cart_quantity,
                price: price * book.cart_quantity,
            }
        })
        console.log(productBookmark, "found")

        // if (!UserProfileReducer.token) {
        //     // UPDATE_CART_ITEM
        //     console.log(CartReducer.total_price, "this is the payload")
        //     NavigationService.navigate(CART_SCREEN);
        //     return;
        // }
        // const productBook = CartReducer.book.map((item) => {
        //     return {
        //         product_id: item.id,
        //         product_type: "book",
        //         quantity: item.cart_quantity,
        //         price: parseFloat(item.cart_price.toString().replace(',', '')),
        //     };
        // });
        // const productBookmark = CartReducer.bookmark.map((item) => {
        //     return {
        //         product_id: item.id,
        //         product_type: "bookmark",
        //         quantity: item.cart_quantity,
        //         price: parseFloat(item.cart_price.toString().replace(',', '')),
        //     };
        // });

        const total_price = CartReducer.total_price
        // const total_price = CartReducer.book.map(item => parseFloat(item.cart_price.toString().replace(',', '')) + CartReducer.bookmark.map(item => parseFloat(item.cart_price.toString().replace(',', ''))))
        const product = [...productBook, ...productBookmark]
        const obj = {
            product,
            total_price
            // total_price: (CartReducer.total_price + parseFloat(product[0].cart_price.toString().replace(',', '')))
        };
        console.log('OBJ CART', obj);

        yield put({ type: FETCH_USER_CART_SUCCESS, payload: null });
        const response = yield call(() => RestClient.post(API_ENDPOINTS.cart, obj));
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const {
            data: { data: res, message, status },
        } = response;

        console.log('CartSAGA  Response . . . .  .', response);
        if (status) {
            RNRestart.Restart();

            // yield all([
            //     put({ type: FETCH_USER_CART }),
            //     put({ type: RE_ADD_TO_CART_SUCCESS }),
            // ]);

            // NavigationService.navigate(CHECKOUT);
        } else {
            console.error('Error', response);
            yield put({ type: RE_ADD_TO_CART_FAILURE });
        }
    } catch (error) {
        yield put({ type: RE_ADD_TO_CART_FAILURE, error });
    }
}
