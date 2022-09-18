import {createSelector} from 'reselect'

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categpriesSlice) => categpriesSlice.categories
)

export const selectCategoriesMap = (state) => {
  console.log('Selector Fired')
  return state.categories.categories.reduce(
    (acc, {title, items}) => {
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );
};
