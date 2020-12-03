export const checkIfLoading = (store, ...actionsToCheck) =>
  store.UIReducer.loader.actions.some((action) =>
    actionsToCheck.includes(action.name),
  );

export const checkIfRefreshing = (store, actionToCheck) =>
  store.UIReducer.loader.refreshing.some((action) => action === actionToCheck);

export const retrieveFavourites = (store) => {
  const Reducers = [
    { reducer: "BookmarksReducer", type: 'bookmark' },
    { reducer: "EnglishBooksReducer", type: 'book' },
    { reducer: "ArabicBooksReducer", type: "book" }
  ];

  const [bookmark, enBook, arBook] = Reducers.map(({ reducer, type }) => store[reducer].filter(item => store.FavouriteReducer[type].some((_favItem) => item.id === _favItem.product_id)));
  const book = enBook.concat(arBook);

  return { book, bookmark }
}