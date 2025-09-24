
// Input selectors
const getItems = (state) => state.items;
const getFilter = (state) => state.filter;

// Memoized selector
const getVisibleItems = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return items.filter((item) => item.completed);
      case 'SHOW_ACTIVE':
        return items.filter((item) => !item.completed);
      default:
        return items;
    }
  }
);

module.exports = {
  getVisibleItems,
};