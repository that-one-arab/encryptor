import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

/**
 * @hook useFetch
 * @param {string} url the URL to fetch from
 * @param {boolean} onEvent define how to fetch the requested url, once component mounts, or once an event occurs
 * @returns {object} if onEvent is true, returns a fetch async callback function, if onEvent is false, returns data from useEffect
 * fetch function
 */
export function useFetch({ url = undefined, onEvent = false } = {}) {
    // Define dispatch hook function to be used with toggling loading on and off
    const dispatch = useDispatch();

    /**
     * @summary define a callback function to be returned if onEvent is true
     * @param {string} callbackURL takes the url to fetch from, default value is useFetch
     * url.
     * @returns {object} fetched response object, with data and ok properties.
     */
    const callFetch = useCallback(
        async ({ callbackURL = url, fetchOptions = {} } = {}) => {
            if (!callbackURL) return;
            dispatch({ type: 'SET_LOADING_ON' });
            try {
                const res = await fetch(callbackURL, fetchOptions);
                const data = await res.json();
                return { ok: true, data };
            } catch (error) {
                console.error(error);
                return { ok: false, data: error };
            } finally {
                dispatch({ type: 'SET_LOADING_OFF' });
            }
        },
        [url, dispatch]
    );

    // The below state values and functions mostly apply for useEffect only.

    // define response from fetch
    const [response, setResponse] = useState({});
    // Define a fetch index used for refetching.
    const [fetchIndex, setFetchIndex] = useState(0);
    const refetch = () => {
        setFetchIndex(fetchIndex + 1);
    };
    // define a fetch function once component mounts if onEvent is false
    useEffect(() => {
        if (onEvent) return;
        const fetchData = async () => {
            if (!url) return;
            dispatch({ type: 'SET_LOADING_ON' });
            try {
                const res = await fetch(url);
                const data = await res.json();
                setResponse({ ok: true, data });
            } catch (error) {
                console.error(error);
                setResponse({ ok: false, data: error });
            } finally {
                dispatch({ type: 'SET_LOADING_OFF' });
            }
        };
        fetchData();
    }, [url, onEvent, fetchIndex, dispatch]);
    // if onEvent is true, return the callback fetch function
    if (onEvent) return callFetch;
    // else return the response from useEffect function
    return { response, refetch };
}
