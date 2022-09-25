import {Routes, Route} from "react-router-dom";

import './shop.styles.scss'
import CategoryPreview from "./../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actFetchCategoriesStart} from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actFetchCategoriesStart())
  }, [])
  
  return (
    <Routes>
      <Route index element={<CategoryPreview/>}/>
      <Route path=':category' element={<Category/>}/>
    </Routes>
  )
}
export default Shop;
