import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const CoinInfo = ({ route }) => {
  const { coinId } = route.params;
  const [coinInfo, setCoinInfo] = useState(null);
  const [chartData, setChartData] = useState([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetchCoinInfo(coinId);
  }, [coinId]);

  const fetchCoinInfo = async (id) => {
    try {
      const responseInfo = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      const dataInfo = responseInfo.data;
      setCoinInfo(dataInfo);

      const responsePriceData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: 7, // Fetch data for the last 7 days
          },
        }
      );

      const priceData = responsePriceData.data.prices;

      // Make sure priceData is defined and is an array before using map
      if (Array.isArray(priceData)) {
        const formattedChartData = priceData.map((item) => ({
          x: new Date(item[0]).toLocaleDateString(),
          y: item[1],
        }));

        setChartData(formattedChartData);
      } else {
        console.error('Error: Price data is not an array');
      }
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
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: chartData.map((item) => item.x),
                datasets: [
                  {
                    data: chartData.map((item) => item.y),
                  },
                ],
              }}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#1E2923',
                backgroundGradientFrom: '#08130D',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
                paddingLeft: -10, // Adjust padding to ensure prices are not cropped
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={styles.chart}
            />
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
    backgroundColor: '#030409',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#030409',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  coinImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  coinSymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  coinName: {
    fontSize: 18,
    color: 'white',
  },
  coinInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  coinPrice: {
    fontSize: 18,
    color: 'white',
  },
  coinPriceChange: {
    fontSize: 18,
  },
  coinMarketCap: {
    fontSize: 18,
    color: 'white',
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
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    marginVertical: 8,
  },
});

export default CoinInfo;
