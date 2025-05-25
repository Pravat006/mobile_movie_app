import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWYxMDI3N2U4Mjk4MDUzYjExYjk4NWEyNjdiODc4OCIsIm5iZiI6MTc0ODA5MTYzNy42MDUsInN1YiI6IjY4MzFjMmY1ZjE0Zjc0MDZhNTgzNzU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RSzzDawyAd0L_brVi7FESpwWJsVUO2KVJaFgqFqG_RU'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log("result data :",json))
    .catch(err => console.error(err));
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>profile</Text>
    </View>
  )
}

export default profile

