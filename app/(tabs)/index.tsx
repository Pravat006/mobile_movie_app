import SearchBar from "@/components/SearchBar"; // Import the custom SearchBar component
import { icons } from "@/constants/icons"; // Import icon assets
import { images } from "@/constants/images"; // Import image assets
import { useRouter } from "expo-router"; // Import router for navigation
import { Image, ScrollView, View } from "react-native"; // Import React Native UI components

export default function Index() {

  const router = useRouter(); // Initialize router for navigation

  return (
    // Main container view with flex layout and primary background color
    <View className="flex-1 bg-primary">
      {/* Background image positioned absolutely behind all content */}
      <Image source={images.bg} className="absolute w-full z-0" />
      
      {/* Scrollable content area with padding and no vertical scroll indicator */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* App logo centered at the top with margin */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        
        {/* Container for the search bar with top margin */}
        <View className="flex-1 mt-5">
          {/* Search bar component with navigation to search page on press */}
          <SearchBar 
            onPress={() => router.push("/search")}
            placeholder="Search for a Movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}



