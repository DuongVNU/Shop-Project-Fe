import './category.styles.scss';
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";

const Category = () => {
  console.log('Re-Render / Category Component')
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log('Effect fired calling set Product')
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])
  
  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
      
      </div>
    
    </Fragment>
  )
}

export default Category;
