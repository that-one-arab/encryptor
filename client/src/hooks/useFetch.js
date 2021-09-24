import { useEffect, useReducer, useState } from 'react';

export const useFetch = (url, skip = false, initialOptions = {}) => {
    console.log('render');

	const initialState = {
		options: initialOptions,
		data: '',
		isLoading: false,
		hasError: false,
		errorMessage: [],
		refetchIndex: 0,
	}

	const reducer = (state = initialState, action) => {
		switch (action.type) {
			case 'SET_DATA':
				return {
					...state,
					data: action.payload
				}
			case 'SET_LOADING_TRUE':
				return {
					...state,
					isLoading: true
				}
			case 'SET_LOADING_FALSE':
				return {
					...state,
					isLoading: false
				}
			case 'SET_ERROR':
				return {
					...state,
					hasError: true
				}
			case 'SET_ERROR_MESSAGE':
				return {
					...state,
					errorMessage: action.payload
				}
			case 'SET_REFETCH_INDEX':
				return {
					...state,
					refetchIndex: state.refetchIndex++
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState)

    const refetch = () =>
		dispatch({type: 'SET_REFETCH_INDEX'})

    useEffect(() => {
		const fetchData = async () => {
			if (skip) return;
			dispatch({type: 'SET_LOADING_TRUE'});
			try {
				const response = await fetch(url, state.options);
				console.log('response: ', response)
				const result = await response.json();
				if (response.ok) {
					dispatch({type: 'SET_DATA', payload: result})
				} else {
					dispatch({type: 'SET_ERROR'});
					dispatch({type: 'SET_ERROR_MESSAGE', payload: result})
				}
			} catch (err) {
				dispatch({type: 'SET_ERROR'});
				dispatch({type: 'SET_ERROR_MESSAGE', payload: err})
			} finally {
				dispatch({type: 'SET_LOADING_FALSE'});
			}
		};
        fetchData();
    }, [url, skip, state.refetchIndex, state.options]);

	return {
		...state,
        refetch,
    };
};

export const usePost = ({url, headers, payload}) => {
    const [res, setRes] = useState({data: null, error: null, isLoading: false});
    const [error, setError] = useState()
    // You POST method here
    const callAPI = useCallback(() => {
		if (skip) return;
		dispatch({type: 'SET_LOADING_TRUE'});
		try {
			const response = await fetch(url, state.options);
			console.log('response: ', response)
			const result = await response.json();
			if (response.ok) {
				dispatch({type: 'SET_DATA', payload: result})
			} else {
				dispatch({type: 'SET_ERROR'});
				dispatch({type: 'SET_ERROR_MESSAGE', payload: result})
			}
		} catch (err) {
			dispatch({type: 'SET_ERROR'});
			dispatch({type: 'SET_ERROR_MESSAGE', payload: err})
		} finally {
			dispatch({type: 'SET_LOADING_FALSE'});
		}
	})
    return [res, callAPI];
}

export default useFetch;
