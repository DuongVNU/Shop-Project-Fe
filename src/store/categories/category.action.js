import {createAction} from "../../utils/reducer/reducer.utils";
import CATEGORIES_ACTION_TYPES from "./category.types";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";

export const actSetCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const actFetchCategoriesStart = () => createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
)
export const actFetchCategoriesSuccess = (categoriesArray) => createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  categoriesArray
)
export const actFetchCategoriesFailed = (error) => createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  error
)
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(actFetchCategoriesStart())
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(actFetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    dispatch(actFetchCategoriesFailed(error))
  }
}
