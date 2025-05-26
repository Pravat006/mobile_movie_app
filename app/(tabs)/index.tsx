import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { data: movies = [], isLoading: moviesLoading, error: moviesError } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchMovies({ query: "" }),
  });


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a Movie"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies </Text>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            )}
            {moviesError && (
              <Text className="text-white">Error: {moviesError?.message}</Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // This creates the 3-column layout
        columnWrapperStyle={{ // Optional: for styling the row wrapper
          justifyContent: 'flex-start', // Or 'space-between', 'space-around'
          gap: 10, // Example gap between items in a row
          // Add other styles for the row if needed
        }}
        contentContainerStyle={{
          paddingHorizontal: 10, // Example padding for the whole list
          paddingBottom: 10
        }}
      />
    </View>
  );
}



