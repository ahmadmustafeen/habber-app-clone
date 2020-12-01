import { FETCH_ARABIC_BOOKS_SUCCESS } from '_redux/actionTypes';

const initialState = [{
  author_name: "Mariam Tran",
  book_language: "arabic",
  cover_type: "Soft-Cover",
  description: "1 of 5 stars2 of 5 stars3 of 5 stars4 of 5 stars5 of 5 stars",
  featured: 0,
  genre: [{ id: 11, title: "romance", arabic_title: "romance" }, { id: 11, title: "romance", arabic_title: "romance" }],
  id: 31,
  image: "http://habber.attribes.com/storage/books/31/download (1)1605277604.jpg",
  isbn: 414984984,
  price: "7,320.0000",
  publisher: {
    currency: { id: 1, iso: "KWD", name: "Kuwaiti dinar", symbol: "KD" },
    email: "admiadminadminadmin",
    first_name: "Admin1231",
    id: 1,
    language: { id: 1, name: "arabic", iso: "ar", status: 1 },
    last_name: "here113",
    phone: "4301229292921",
    profile_pic: "http://habber.attribes.com/storage/users/1/download1606384423.jpg",
    status: "Active"
  },
  quantity: 0,
  status: 1,
  stock_status: 0,
  title: "Arabic non-fiction",
  total_pages: 465
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARABIC_BOOKS_SUCCESS: {
      // return [...action.payload.data];
      return state
    }

    default:
      return state;
  }
};
