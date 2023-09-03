import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const AllCoins = ({ navigation }) => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    // Fetch coin data from the API
    fetchCoinData();
  }, []);

  const fetchCoinData = async () => {
    try {
      const currency = 'usd'; // You can change the currency as needed
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  // Function to navigate to CoinInfo and pass coin ID
  const handleCoinPress = (coinId) => {
    navigation.navigate('CoinInfo', { coinId });
  };

  // Render each coin item
  const renderItem = ({ item }) => {
    const priceChange = item.price_change_percentage_24h;
    const priceChangeColor = priceChange >= 0 ? 'green' : 'red';

    return (
      <View style={styles.coinItem}>
        <TouchableOpacity onPress={() => handleCoinPress(item.id)}>
          <Image style={styles.coinImage} source={{ uri: item.image }} />
        </TouchableOpacity>
        <View style={styles.coinDetails}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinSymbol}>{item.symbol}</Text>
          <View style={styles.coinInfoRow}>
            <Text style={styles.coinPrice}>Price: {item.current_price.toFixed(3)}$</Text>
            <Text style={{ ...styles.coinPriceChange, color: priceChangeColor }}>
              24h Change: {priceChange.toFixed(2)}%
            </Text>
          </View>
          <Text style={styles.coinMarketCap}>Market Cap: {item.market_cap}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.yellowColorTitle}>All Coins</Text>

      <FlatList
        data={coinData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030409',
  },
  yellowColorTitle: {
    color: '#EACC00',
    fontWeight: '800',
    fontSize: 45,
    marginTop: 35,
  },
  coinItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  coinImage: {
    width: 50,
    height: 50,
  },
  coinDetails: {
    marginLeft: 10,
  },
  coinName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinSymbol: {
    fontSize: 16,
  },
  coinInfoRow: {
    flexDirection: 'row', // Make coin info items stack horizontally
    flexWrap: 'wrap', // Allow content to wrap to the next line if needed
    alignItems: 'center',
  },
  coinPrice: {
    fontSize: 16,
    marginRight: 10, // Add spacing between Price and 24h Change
  },
  coinPriceChange: {
    fontSize: 16,
  },
  coinMarketCap: {
    fontSize: 16,
  },
});

export default AllCoins;
