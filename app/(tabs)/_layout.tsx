import { icons } from '@/constants/icons'
import { Text } from '@react-navigation/elements'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, View } from 'react-native'
import { images } from "../../constants/images"

// Type definition for the props expected by TabIcon component
type TabIconProps = {
    focused: boolean; // Whether the tab is currently focused/active
    icon: any;        // Icon image source for the tab
    title: string;    // Title label for the tab
};

// Custom component to render the tab icon and label
const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title }) => {
    if(focused){
        // If the tab is focused, show a highlighted background and colored icon/text
        return (
            <ImageBackground
                source={images.highlight}
                className='flex flox-row w-full flex-1 min-w-[110px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
            >
                <Image
                    source={icon}
                    tintColor="#151312"
                    className='size-5'
                />
                <Text className='text-secondary text-base  font-semibold'>{title}</Text>
            </ImageBackground>
        );
    }
    // If the tab is not focused, show a simple icon with muted color
    return (
        <View className='size-full justify-center items-center mt-4 rounded-full' >
            <Image  source={icon} tintColor="#A8B5D8"  />
        </View>
    )
}

// Main layout component for the tab navigator
const _layout = () => {
    return (
        <Tabs
            // Configure the appearance and behavior of the tab bar
            screenOptions={{
                tabBarShowLabel: false, // Hide default tab labels
                tabBarItemStyle:{
                    width: "100%",
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#0f0D23', // Tab bar background color
                    borderRadius:50,             // Rounded corners
                    marginHorizontal:20,         // Horizontal margin
                    marginBottom: 20,            // Bottom margin
                    height:52,                   // Tab bar height
                    position: 'absolute',        // Absolute positioning
                    overflow:'hidden',           // Hide overflow
                    borderWidth: 1,              // Border width
                    borderColor: '#0f0D23',      // Border color
                }
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false, // Hide the header for this tab
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}
            />
            {/* Search Tab */}
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            {/* Saved Tab */}
            <Tabs.Screen
                name='saved'
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    )
                }}
            />
            {/* Profile Tab */}
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout

