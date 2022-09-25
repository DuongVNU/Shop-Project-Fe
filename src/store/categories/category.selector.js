import {createSelector} from 'reselect';

const selectCategoryReducer = (state) => {
  return state.categories;
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const {title, items} = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
// export const selectCategoriesMap = (state) => {
//   console.log('Selector Fired')
//   return state.categories.categories.reduce((acc, {title, items}) => {
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

