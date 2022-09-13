import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const {type, payload} = action;
  
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}


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
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount
    }
    ))
    
  }
  const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  
  const addItemToCart = (productToAdd) => {
    let newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }
  const removeItemToCart = (cartItemToRemove) => {
    let newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }
  
  const clearItemFromCart = (cartItemToRemove) => {
    let newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }
  
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }
  
  let value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
