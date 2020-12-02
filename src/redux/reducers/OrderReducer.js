import { FETCH_ORDER_SUCCESS } from '_redux/actionTypes';

const initialState = [
    {
        order_id: "23232323",
        order_title:
            [
                { title: "first Book" },
                { title: "second Book" },
                { title: "third Book" },
            ],
        order_status: "delivered",
        order_total: "222",
        order_date: "02-02-2020",
    }, {
        order_id: "23232323",
        order_title:
            [
                { title: "first Book" },
                { title: "second Book" },
                { title: "third Book" },
            ],
        order_status: "delivered",
        order_total: "222",
        order_date: "02-02-2020",
    }, {
        order_id: "23232323",
        order_title:
            [
                { title: "first Book" },
                { title: "second Book" },
                { title: "third Book" },
            ],
        order_status: "delivered",
        order_total: "222",
        order_date: "02-02-2020",
    }, {
        order_id: "23232323",
        order_title:
            [
                { title: "first Book" },
                { title: "second Book" },
                { title: "third Book" },
            ],
        order_status: "delivered",
        order_total: "222",
        order_date: "02-02-2020",
    },
];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_SUCCESS: {
            return [...state];
        }

        default:
            return state;
    }
};
