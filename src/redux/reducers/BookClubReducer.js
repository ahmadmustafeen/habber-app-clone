import { FETCH_BOOKCLUBS_SUCCESS } from '_redux/actionTypes';

const initialState = [
  // {
  //   id: 1,
  //   name: "bookclub1",
  //   featured: 1,
  //   image: 'http://habber.attribes.com/storage/books/4/book1604572263.png',
  //   book: {
  //     author_name: 'Brock fg',
  //     book_language: 'english',
  //     cover_type: 'Vel nobis nisi aut a',
  //     description: 'Cum quia possimus f',
  //     featured: 1,
  //     genre: [],
  //     id: 4,
  //     image: 'http://habber.attribes.com/storage/books/4/book1604572263.png',
  //     isbn: 856,
  //     price: '0.0000',
  //     publisher: {
  //       id: 1,
  //       first_name: 'Admin',
  //       last_name: 'here',
  //       email: 'admin@admin.com',
  //       phone: '4301229292921',
  //     },
  //     quantity: 781,
  //     status: 1,
  //     stock_status: 0,
  //     title: 'Explicabo Addsf iste q',
  //     total_pages: 58,
  //   }
  // },
]

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKCLUBS_SUCCESS: {
      if (action.payload === null) {
        return initialState
      }
      return [...action.payload];
    }

    default:
      return state;
  }
};
