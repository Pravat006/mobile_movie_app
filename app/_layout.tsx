import { Stack } from "expo-router"; // Import Stack navigator from expo-router
import "./global.css"; // Import global CSS styles

export default function RootLayout() {
  // Define the root layout for the app using a Stack navigator
  return (
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
  );
}
