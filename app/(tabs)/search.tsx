// Import necessary React Native components and utilities
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

// Import custom constants and components
import { images } from '@/constants/images'
import { icons } from '@/constants/icons';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';

// Import data fetching and state management utilities
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';


// Main search component function
const search = () => {

    // State to store the current search query input by user
    const [query, setQuery] = React.useState("");

    // React Query hook for fetching movies based on search query
    const { data: movies = [], isLoading, error, refetch } = useQuery({
        queryKey: ['movies', query], // Unique key for caching, includes query for cache invalidation
        queryFn: () => fetchMovies({ query }), // Function to fetch movies from API
        enabled: false // Disabled by default, will be triggered manually via refetch()
    });

    // Effect hook to implement debounced search (waits 1.5s after user stops typing)
    useEffect(() => {

        // Set a timeout to delay the API call
        const timeoutId = setTimeout(async () => {
            if (query.trim()) {
                // If query is not empty, refetch movies with the current query
                if (movies?.length > 0 && movies?.[0]) {
                    updateSearchCount(query, movies?.[0]);
                }
                await refetch();
            }
        }, 500); // 1.5 second delay for debouncing

        // Cleanup function to clear timeout if component unmounts or query changes
        return () => clearTimeout(timeoutId);
    }, [query, refetch]); // Dependencies: re-run when query or refetch function changes



    // Debug log to track query changes
    console.log("movies", query);

    // Main component render
    return (
        // Main container with full height and primary background color
        <View className='flex-1 bg-primary'>
            {/* Background image that covers the entire screen */}
            <Image
                source={images.bg}
                className="absolute w-full z-0" // Positioned absolutely behind other content
            />

            {/* FlatList component for displaying search results in a grid */}
            <FlatList
                data={movies} // Array of movie data to display

                // Render function for each movie item
                renderItem={({ item }) => (
                    <MovieCard
                        {...item} // Spread all movie properties as props to MovieCard
                    />
                )}

                // Key extractor for React's reconciliation (using index as fallback)
                keyExtractor={(item, index) => index.toString()}

                // Styling classes for the FlatList
                className='px-5' // Horizontal padding of 5 units

                // Grid layout configuration
                numColumns={3} // Display 3 movies per row

                // Styling for each row wrapper in the grid
                columnWrapperStyle={{
                    justifyContent: 'center', // Center items horizontally
                    gap: 16, // 16 units gap between items in a row
                    marginVertical: 16 // Vertical margin for each row
                }}

                // Styling for the entire content container
                contentContainerStyle={{
                    paddingBottom: 10 // Bottom padding to prevent content cutoff
                }}

                // Component to show when no search results are found
                ListEmptyComponent={
                    // Only show "no results" if not loading, no error, and user has entered a search query
                    !isLoading && !error && query.trim() ? (
                        <View className='flex-1 items-center justify-center'>
                            <Text className='text-white text-lg'>
                                No results found for "{query}"
                            </Text>
                        </View>
                    ) : null // Don't show anything if conditions aren't met
                }

                // Header component that appears at the top of the list
                ListHeaderComponent={
                    <>
                        {/* Logo section */}
                        <View className='w-full flex-row justify-center mt-20 items-center'>
                            <Image
                                source={icons.logo}
                                className='w-12 h-10' // Fixed logo dimensions
                            />
                        </View>

                        {/* Search input section */}
                        <View>
                            <SearchBar
                                placeholder='Search for a Movie'
                                onChangeText={(text: string) => setQuery(text)} // Update query state on text change
                            />
                        </View>

                        {/* Loading indicator - shows while API call is in progress */}
                        {
                            isLoading && (
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff" // Blue color for spinner
                                    className='my-3 self-center' // Margin and center alignment
                                />
                            )
                        }

                        {/* Error message display */}
                        {
                            error && (
                                <Text className='text-red-500 text-center'>
                                    Error: {error?.message}
                                </Text>
                            )
                        }

                        {/* Search results header - shows when results are found */}
                        {
                            // Only show if not loading, no error, query exists, and results found
                            !isLoading && !error && query.trim() && movies?.length > 0 && (
                                <Text className='text-xl text-white font-bold'>
                                    search results for {' '}
                                    <Text className='text-accent'>{query}</Text> {/* Highlighted query text */}
                                </Text>
                            )
                        }
                    </>
                }
            />
        </View>
    )
}

export default search
