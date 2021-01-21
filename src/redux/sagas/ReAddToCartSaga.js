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
import { CHECKOUT } from '../../constants/Screens';

export function* ReAddToCartSaga({ type, payload }) {
    try {




        const { CartReducer, UserProfileReducer } = yield select(
            ({ CartReducer, UserProfileReducer }) => {
                return { CartReducer, UserProfileReducer };
            },
        );
        console.log(CartReducer, "THIS IS IN  CART")
        // if (!UserProfileReducer.token) {
        //     // UPDATE_CART_ITEM
        //     console.log(CartReducer.total_price, "this is the payload")
        //     NavigationService.navigate(CART_SCREEN);
        //     return;
        // }
        const productBook = CartReducer.book.map((item) => {
            return {
                product_id: item.id,
                product_type: "book",
                quantity: item.cart_quantity,
                price: parseFloat(item.cart_price.toString().replace(',', '')),
            };
        });
        const productBookmark = CartReducer.bookmark.map((item) => {
            return {
                product_id: item.id,
                product_type: "bookmark",
                quantity: item.cart_quantity,
                price: parseFloat(item.cart_price.toString().replace(',', '')),
            };
        });
        const product = [...productBook, ...productBookmark]
        const total_price = CartReducer.total_price
        // const total_price = CartReducer.book.map(item => parseFloat(item.cart_price.toString().replace(',', '')) + CartReducer.bookmark.map(item => parseFloat(item.cart_price.toString().replace(',', ''))))

        const obj = {
            product,
            total_price
            // total_price: (CartReducer.total_price + parseFloat(product[0].cart_price.toString().replace(',', '')))
        };
        console.log('OBJ CART', obj);
        const response = yield call(() => RestClient.post(API_ENDPOINTS.cart, obj));
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const {
            data: { data: res, message, status },
        } = response;

        console.log('CartSAGA  Response . . . .  .', response);
        if (status) {
            yield all([
                put({ type: FETCH_USER_CART }),
                put({ type: RE_ADD_TO_CART_SUCCESS }),
            ]);
            // NavigationService.navigate(CHECKOUT);
        } else {
            console.error('Error', response);
            yield put({ type: RE_ADD_TO_CART_FAILURE });
        }
    } catch (error) {
        yield put({ type: RE_ADD_TO_CART_FAILURE, error });
    }
}
