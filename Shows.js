import React, { useState,useEffect} from 'react';
import { View, StyleSheet, Image,Dimensions } from 'react-native';
import { ApplicationProperties } from '../../../application.properties';
import { SafeAreaView } from 'react-native';
import { adsApi } from '../../../features/ads/services/adsService';
import Carousel from 'react-native-snap-carousel';
import Location from '../../outhers/Location_data/analising_place';
const width=Dimensions.get('window').width
const height=Dimensions.get('window').height
const CarouselComponent = () => {
  const listaDeImagens = [];
  const [jsonResponse,setJsonResponse] =useState('')


const {
  refetch,
  status: status,
  data: dados,
  error: erro,
  isLoading
 
} = adsApi.useGetAdsByStatusQuery(1);

useEffect(()=>{


  const interval =  setInterval(() => {
    refetch()

  },2000);
  return () => {
    clearInterval(interval);
    };
     
},[isLoading,dados, erro, refetch,status])

for(let i=0;i<dados?.length;i++){
  listaDeImagens.push({
    id:i,
    caminho:ApplicationProperties.Url+dados[i].address
  })
}

  const renderItem = ({ item }) => (
    <View >
      <Image source={{ uri: item.caminho }} style={styles.content} resizeMode="cover" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <Location/>
      <Carousel
      
        data={listaDeImagens}
        renderItem={renderItem}
        sliderWidth={width*100}
        itemWidth={width-100}
        layout="tinder"
        loop
        autoplay
        autoplayInterval={10000}
        pagination={true}
        activeSlideAlignment={'center'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    
  
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  
    elevation: 3,
    width: width, 
    height: width, 

    alignSelf:'center' 
  },
  content: {
    width: width, 
    height: width*1, 
    alignSelf:'center'
  },
});

export default CarouselComponent;
