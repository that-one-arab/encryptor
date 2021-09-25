import { createStore } from 'redux';

const initialState = {
    loading: false,
};

/**
 * @function reducer Used to toggle loading on and off globally in useFetch hook.
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING_ON':
            return {
                ...state,
                loading: true,
            };
        case 'SET_LOADING_OFF':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export const store = createStore(reducer);
