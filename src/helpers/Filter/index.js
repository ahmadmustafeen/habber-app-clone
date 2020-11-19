export const setFilterHandler = (data, filter) => {
  return data.filter((item) => {
    return item.genre.some((genre) => filter.includes(genre.title));
  });
};
