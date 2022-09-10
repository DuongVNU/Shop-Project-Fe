import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {
  },
  cartItems: [],
  addItemToCart: () => {
  },
  removeItemToCart: () => {
  },
  clearItemFromCart: () => {
  },
  cartCount: 0,
  cartTotal: 0
  
})

const addCartItem = (cartItems, productToAdd) => {
  console.log("11111111", cartItems, productToAdd)
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id
  })
  
  if (existingCartItem) {
    
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {
      ...cartItem,
      quantity: cartItem.quantity + 1
    } : cartItem)
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id
  })
  
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {
    ...cartItem,
    quantity: cartItem.quantity - 1
  } : cartItem)
  
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  const addItemToCart = (productToAdd) => {
    console.log('addItemToCart', addCartItem(cartItems, productToAdd))
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }
  
  
  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove))
  }
  
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems]);
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total,cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
    setCartTotal(newCartTotal)
    
      }, [cartItems])
  
  let value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
