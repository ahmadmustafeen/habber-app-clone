export const setFilterHandler = (data, filter) => {
  return data.filter((item) => {
    filter.includes(item.genre[0].title);
  });
};
