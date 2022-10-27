import {takeLatest, call, put, all} from 'typed-redux-saga';

import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

import {
  actFetchCategoriesSuccess,
  actFetchCategoriesFailed,
} from './category.action';

import {CATEGORIES_ACTION_TYPES} from './category.types';
// WARNING: Khó hiểu cả file, phần bổ sung trường downlevelIteration vào file ts.config
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(actFetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(actFetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
