// Configuration object for The Movie Database (TMDB) API
export const TMDB_CONFIG = {
    BASE_URL: process.env.TMDB_BASE_URL,      // Base URL for TMDB API, loaded from environment variable
    API_KEY: process.env.TMDB_API_KEY,        // API key for TMDB, loaded from environment variable
    headers: {
        accept: "application/json",           // Accept JSON responses
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` // Bearer token for authorization, from env
    }
}

// Function to fetch movies from TMDB API, either by search query or by popularity
export const fetchMovies = async ({ query }: { query: string }) => {
    // Determine endpoint: search if query is provided, otherwise discover popular movies
    const endpoint = query 
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // Make the API request
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })

    // Throw error if response is not received
    if (!response) {
        throw new Error("failed to fetch movies: ", response)
    }

    // Parse the JSON response and return the movie results
    const data = await response.json();
    return data.results;
}