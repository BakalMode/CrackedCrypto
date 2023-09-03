import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CoinInfo = ({ route }) => {
  const { coinId } = route.params;
  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    // Fetch coin data based on the coinId
    fetchCoinInfo(coinId);
  }, [coinId]);

  const fetchCoinInfo = async (id) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await response.json();
      setCoinInfo(data);
    } catch (error) {
      console.error('Error fetching coin info:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {coinInfo ? (
        <>
          <View style={styles.header}>
            <Image style={styles.coinImage} source={{ uri: coinInfo.image.large }} />
            <View>
              <Text style={styles.coinSymbol}>{coinInfo.symbol}</Text>
              <Text style={styles.coinName}>{coinInfo.name}</Text>
            </View>
          </View>
          <View style={styles.coinInfoRow}>
            <Text style={styles.infoLabel}>Current Price:</Text>
            <Text style={styles.coinPrice}>${coinInfo.market_data.current_price.usd.toFixed(2)}</Text>
          </View>
          <View style={styles.coinInfoRow}>
            <Text style={styles.infoLabel}>Market Cap:</Text>
            <Text style={styles.coinMarketCap}>${coinInfo.market_data.market_cap.usd.toLocaleString()}</Text>
          </View>
          <View style={styles.coinInfoRow}>
            <Text style={styles.infoLabel}>24h Change:</Text>
            <Text
              style={{
                ...styles.coinPriceChange,
                color: coinInfo.market_data.price_change_percentage_24h > 0 ? 'green' : 'red',
              }}
            >
              {coinInfo.market_data.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
          <View style={styles.centeredInfo}>
            <Text style={styles.centeredInfoLabel}>Rank:</Text>
            <Text style={styles.centeredInfoText}>{coinInfo.market_data.market_cap_rank}</Text>
          </View>
          <View style={styles.centeredInfo}>
            <Text style={styles.centeredInfoLabel}>Circulating Supply:</Text>
            <Text style={styles.centeredInfoText}>{coinInfo.market_data.circulating_supply.toFixed(0)}</Text>
          </View>
          <View style={styles.centeredInfo}>
            <Text style={styles.centeredInfoLabel}>Total Supply:</Text>
            <Text style={styles.centeredInfoText}>{coinInfo.market_data.total_supply.toFixed(0)}</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030409', // Dark background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center header contents
    padding: 20,
    backgroundColor: '#030409', // Header background color
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Header border color
  },
  coinImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  coinSymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Symbol text color
  },
  coinName: {
    fontSize: 18,
    color: 'white', // Name text color
  },
  coinInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Info row border color
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Label text color
  },
  coinPrice: {
    fontSize: 18,
    color: 'white', // Price text color
  },
  coinPriceChange: {
    fontSize: 18,
  },
  coinMarketCap: {
    fontSize: 18,
    color: 'white', // Market cap text color
  },
  centeredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  centeredInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredInfoText: {
    fontSize: 16,
    color: 'white',
  },
});

export default CoinInfo;
