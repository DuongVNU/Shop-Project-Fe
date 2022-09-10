import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

const addCartItem = (cartItems, productToAdd) => {
  console.log("11111111",cartItems,productToAdd)
  const existingCartItem = cartItems.find((cartItem)=>{
    return cartItem.id === productToAdd.id
  })
  
  if(existingCartItem) {
    
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1}:cartItem)
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}


export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  const addItemToCart = (productToAdd) => {
    console.log('addItemToCart', addCartItem(cartItems, productToAdd))
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  
  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity,0)
    setCartCount(newCartCount);
  },[cartItems])
  
  let value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
