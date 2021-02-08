import { FETCH_PRODUCT, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const productReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items
            }
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items
            }
        case FETCH_PRODUCT:
            return {items: action.payload, filteredItems: action.payload}
    
        default:
            return state;
    }
}