import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';



// Define the props expected by the SearchBar component
interface Props{
    placeholder: string;      // Placeholder text for the search input
    onPress: () => void;      // Function to call when the search bar is pressed (not used correctly here)
}

// SearchBar component for displaying a styled search input with an icon
const SearchBar = ({placeholder, onPress}:Props) => {
    return (
        // Container for the search bar with styling for layout and background
        <View className='flex-row items-center  bg-dark-100 rounded-full px-5 py-4'>
            {/* Search icon on the left side */}
            <Image
                source={icons.search}
                className='w-5 h-5 '
                resizeMode='contain'
                tintColor="#ab8bff"
            />
            {/* Text input for entering search queries */}
            <TextInput
                onPress={onPress} // This prop does not exist on TextInput and will be ignored
                placeholder={placeholder} // Placeholder text shown when input is empty
                value=''                  // Input value is always empty (not controlled)
                onChangeText={() => {}}   // No-op handler for text changes
                placeholderTextColor="white" // Color of the placeholder text
                className='flex-1 ml-3 '     // Styling for input to expand and add margin
            />
        </View>
    )
}

export default SearchBar

// 1.05.09