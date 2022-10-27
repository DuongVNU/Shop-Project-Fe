import {createSelector} from 'reselect';
import {CategoriesState} from "./category.reducer";
import {CategoryMap} from "./category.types";
import {RootState} from "../store";

const selectCategoryReducer = (state: RootState):CategoriesState => {
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
  (categories):CategoryMap =>
    categories.reduce((acc, category) => {
      const {title, items} = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
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

