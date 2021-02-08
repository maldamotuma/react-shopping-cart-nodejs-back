import { FETCH_PRODUCT } from "../types";

export const productReducer = (state={}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            console.log('the payload is : '+action.payload);
            return {items: action.payload}
    
        default:
            return state;
    }
}