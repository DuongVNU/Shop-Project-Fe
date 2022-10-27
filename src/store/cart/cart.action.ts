import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id
  })

  if (existingCartItem) {

    return cartItems.map((cartItem: CartItem) => cartItem.id === productToAdd.id ? {
      ...cartItem,
      quantity: cartItem.quantity + 1
    } : cartItem)
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id
  })

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {
    ...cartItem,
    quantity: cartItem.quantity - 1
  } : cartItem)

}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const addItemToCart = withMatcher((productToAdd: CategoryItem, cartItems: CartItem[]): SetCartItems => {
  let newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
})
export const removeItemToCart = withMatcher((cartItemToRemove: CartItem, cartItems: CartItem[]): SetCartItems => {
  let newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
})

export const clearItemFromCart = withMatcher((cartItemToRemove: CartItem, cartItems: CartItem[]): SetCartItems => {
  let newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
})

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
)

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);
