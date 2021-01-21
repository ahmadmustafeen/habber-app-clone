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
import { FETCH_ARABIC_BOOKS, FETCH_BOOKCLUBS, FETCH_BOOKMARKS, FETCH_ENGLISH_BOOKS, FETCH_USER_CART_SUCCESS } from '../actionTypes';

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
        console.log(userProfile, "SHOULD M<ATCH")

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
        const total_price = CartReducer.total_price
        const product = [...productBook, ...productBookmark]
        const obj = {
            product,
            total_price
        };
        // yield put({ type: FETCH_USER_CART_SUCCESS, payload: null });

        if (!userProfile.token) {
            const Productbooks = CartReducer.book.map((book) => {
                let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
                price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

                return {
                    ...book,
                    cart_price: price * book.cart_quantity,
                    price: price
                }
            })
            console.log(Productbooks, "THIS")
            const Productbookmarks = CartReducer.bookmark.map((book) => {
                let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
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

            yield put({ type: FETCH_USER_CART_SUCCESS, payload: objCArt });
            return false
        }
        const Productbooks = CartReducer.book.map((book) => {
            let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
            price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

            return {
                ...book,
                cart_price: price * book.cart_quantity,
                price: price
            }
        })
        console.log(Productbooks, "THIS")
        const Productbookmarks = CartReducer.bookmark.map((book) => {
            let price = (books.find(bookss => book.id === bookss.id).prices.find((id) => userProfile.currency.id === id.id).price)
            price = parseFloat(parseFloat(price.toString().replace(",", ""))).toFixed(2)

            return {
                ...book,
                cart_price: price * book.cart_quantity,
                price: price
            }
        })
        let total_prices = 0
        Productbookmarks.map(bookmark => total_prices += bookmark.cart_price)
        Productbooks.map(bookmark => total_prices += bookmark.cart_price)
        var objCArt = {
            book: Productbooks,
            bookmark: Productbookmarks,
            total_price: total_prices,
        }
        yield put({ type: FETCH_USER_CART_SUCCESS, payload: { book: [], bookmark: [], total_price: 0 } })
        yield put({ type: FETCH_USER_CART_SUCCESS, payload: objCArt })
        const response = yield call(() => RestClient.post(API_ENDPOINTS.cart, obj));
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const {
            data: { data: res, message, status },
        } = response;

        console.log('CartSAGA  Response . . . .  .', response);
        if (status) {

            yield put({ type: FETCH_ENGLISH_BOOKS });
            yield put({ type: FETCH_ARABIC_BOOKS });
            yield put({ type: FETCH_BOOKCLUBS });
            yield put({ type: FETCH_BOOKMARKS });
            yield put({
                type:
                    FETCH_USER_CART
            });
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
