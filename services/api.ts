import axios from 'axios'; // Import axios
import Constants from "expo-constants";

// Configuration object for The Movie Database (TMDB) API
export const TMDB_CONFIG = {
    BASE_URL:"https://api.themoviedb.org/3",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${Constants.expoConfig?.extra?.TMDB_ACCESS_TOKEN}`,
    },
};
// console.log("Authorization:", TMDB_CONFIG.headers.Authorization.toString());
// console.log("Base URL:", TMDB_CONFIG.BASE_URL);
export const fetchMovies = async ({
    query,
}: {
    query: string;
}): Promise<Movie[]> => {

    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=true&page=1&sort_by=popularity.desc`;
    

    const headersToSend = {
        accept: "application/json",
        Authorization: `Bearer ${Constants.expoConfig?.extra?.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json", // Often not needed for GET with axios, but doesn't hurt
        "User-Agent": "MovieApp/1.0 (Android)",
    };


    try {
        const response = await axios.get(endpoint, {
            headers: headersToSend,
            timeout: 60000 // Increase to 60 seconds for testing
        });
        // Axios puts the data directly in response.data
        return response.data.results ?? []; 
    } catch (error: any) { // Catch block for axios errors
        console.error("ANDROID DEBUG (Axios): fetchMovies CATCH block error for TMDB:");
        if (axios.isAxiosError(error)) {
            console.error("   Axios error message:", error.message);
            if (error.response) {
                console.error("   Axios error response data:", JSON.stringify(error.response.data));
                console.error("   Axios error response status:", error.response.status);;
            } else if (error.request) {
                console.error("   Axios error: No response received, request was made:", error.request);
            }
        } else {
            console.error("   Non-Axios error:", error);
        }
        throw error; // Re-throw for React Query to handle
    }
};