import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

const PopularMovies = ({
    id,
    searchTerm,
    movie_id,
    title,
    count,
    poster_url,
    index,
}: TrendingMovie & { index: number }) => {
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    source={{ uri: poster_url }}
                    className='w-32 h-48 rounded-lg'
                    resizeMode='cover'

                />
                <View className='absolute bottom-9 -left-3.5'>

                    <MaskedView
                        maskElement={
                            <View>
                                <Text className='font-bold text-white text-6xl'>{index+1}</Text>
                                <Image 
                                    source={images.rankingGradient}
                                    className='size-14'
                                    resizeMode="cover"
                                />
                            </View>
                        }
                        >

                    </MaskedView>
                        </View>
                        <Text className='text-sm font-bold mt-2 text-light-200 ' numberOfLines={2}>
                            {title}
                        </Text>
            </TouchableOpacity>
        </Link>
    )
}


export default PopularMovies
