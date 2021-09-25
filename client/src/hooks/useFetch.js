import { useEffect, useCallback, useState } from 'react';

/**
 *
 * @param {string} url the URL to fetch from
 * @param {boolean} skipInitialFetch if true, skips the initial fetch request, only requests from refetch
 * function are accepted
 * @param {function} callbackFunc if specified, calls that function after fetching.
 * @param {object} fetchOptions second param for the 'fetch' API
 * @returns {object: {data, loading, refetch}} data being the data from fetch
 * loading being the loading indicator and refetch being a function that refetches
 * from the URL (Could also be used as a post/put/etc... methods)
 */

export default function useFetch(
    initialUrl,
    { skipInitialFetch = false, callbackFunc = undefined } = {},
    fetchOptions = {}
) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // Everytime useFetch is called, and 'fetchOptions' aren't passed useFetch give fetchOptions default value of {}
    // So every time that function is called, it's a brand new object reference, which triggers an infinite loop in useEffect.
    // giving it the initial value to 'options' state regardless of whether it was empty or not, solves the issue.
    const [options] = useState(fetchOptions);
    // handles updating url to refetch with new url
    const [url, updateUrl] = useState(initialUrl)

    // if skipInitialFetch is true, useEffect is completely ignored
    // and this function get's returned from useFetch hook as a callback
    // to make fetch requests
    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(url, fetchOptions);
            console.log('res: ', res)
            const data = await res.json();
            // if response returned status ok
            if (res.ok) setData({ok: true, data});
            // else
            else setData({ok: false, err: data})
            // if callback function is defined, trigger it.
            callbackFunc && await callbackFunc()
        } catch (error) {
            console.error(error);
            setData({ok: false, err: error.message})
        } finally {
            setLoading(false);
        }
    }, [url, fetchOptions, callbackFunc]);

    useEffect(() => {
        if (skipInitialFetch) return;
        const fetchData = async () => {
            if (!url) return
            setLoading(true);
            try {
                const res = await fetch(url, options);
                console.log('res: ', res)
                const data = await res.json();
                if (res.ok) setData({ok: true, data});
                else setData({ok: false, err: data})
            } catch (error) {
                console.error(error);
                setData({ok: false, err: error})
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [skipInitialFetch, url, options]);
    return { data, refetch, loading, updateUrl };
}
