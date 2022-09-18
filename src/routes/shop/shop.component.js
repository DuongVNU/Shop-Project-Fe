import {Routes, Route} from "react-router-dom";

import './shop.styles.scss'
import CategoryPreview from "./../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {actSetCategories} from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(actSetCategories(categoriesArray))
    }
    getCategoriesMap();
  }, [])
  
  return (
    <Routes>
      <Route index element={<CategoryPreview/>}/>
      <Route path=':category' element={<Category/>}/>
    </Routes>
  )
}
export default Shop;
