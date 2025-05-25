import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import { Stack } from "expo-router"; // Import Stack navigator from expo-router
import React from "react";
import "./global.css"; // Import global CSS styles

const queryClient = new QueryClient(); // Create a QueryClient instance

export default function RootLayout() {
  // Define the root layout for the app using a Stack navigator
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {/* Main tab navigator, hides the header for all tab screens */}
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
        {/* Movie details screen, hides the header for movie detail pages */}
        <Stack.Screen 
          name="movies/[id]" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
