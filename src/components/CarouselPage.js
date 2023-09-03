import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { TrendingCoins } from '../config/api';

const CarouselPage = () => {
  const [trending, setTrending] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins('USD'));
      setTrending(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  // Function to format and style price change percentage
  const formatPriceChangePercentage = (percentage) => {
    const formattedPercentage = percentage.toFixed(2) + '%';
    if (percentage < 0) {
      return (
        <Text style={styles.redText}>{formattedPercentage}</Text>
      );
    } else if (percentage >= 0 && percentage <= 1) {
      return (
        <Text style={styles.blackText}>{formattedPercentage}</Text>
      );
    } else {
      return (
        <Text style={styles.greenText}>{formattedPercentage}</Text>
      );
    }
  };

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          style={styles.coinImage}
          source={{ uri: item.image }}
        />
        <Text style={styles.nameSymbolText}>{item.name} - {item.symbol}</Text>
        <Text>Price: {item.current_price}$</Text>
        {formatPriceChangePercentage(item.price_change_percentage_24h)}
      </View>
    );
  };

  const backgroundColor = "#030409"; // Background color

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.pageTitle}>Trending Coins</Text>
      <Carousel
        data={trending}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={200}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        autoplay={true}
        autoplayDelay={5000} // Delay between screens set to 5 seconds
        autoplayInterval={5000} // Switch every 5 seconds
        loop={true} // Loop the carousel endlessly
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  coinImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  activeSlideText: {
    marginTop: 20,
    color: 'white',
  },
  redText: {
    color: 'red',
  },
  blackText: {
    color: 'black',
  },
  greenText: {
    color: 'green',
  },
  nameSymbolText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black', // Text color for name, symbol, and price
  },
});

export default CarouselPage;
