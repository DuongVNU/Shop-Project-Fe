import {loadStripe} from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  'pk_test_51LmsGLLbP9vEnG1qdiTIOXw9sx8lGbFTiBEgfvXxKW9813cDRliDuzYxGkaKl8AO2zvwWcHwgtQqxg1gPVdHFF8l00wmn5sWuC'
)