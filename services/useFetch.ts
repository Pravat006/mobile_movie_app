import { useEffect, useState } from "react";

// Custom hook for fetching data asynchronously
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    // State to store fetched data
    const [data, setdata] = useState<T | null>(null);
    // State to store any error that occurs during fetch
    const [error, setError] = useState<Error | null>(null);
    // State to indicate if fetch is in progress
    const [loading, setLoading] = useState(false);

    // Function to perform the fetch operation
    const fetchData = async () => {
        try {
            setLoading(true);      // Set loading to true before starting fetch
            setError(null);        // Reset error state before fetch
            const result = await fetchFunction(); // Call the provided fetch function
            setdata(result);       // Store the fetched data
        } catch (err) {
            // If an error occurs, store it in error state
            setError(err instanceof Error ? err : new Error("An error occurred"))
        }
        finally {
            setLoading(false);     // Set loading to false after fetch completes
        }
    }

    // Reset function to clear all state values back to initial state
    const reset = () => {
        setdata(null);
        setError(null);
        setLoading(false);
    }

    // useEffect to automatically fetch data on mount if autoFetch is true
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [])

    // Return the state and functions for use in components
    return { data, error, loading, fetchData, reset };
}

export default useFetch;
