import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AllCoins = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.yellowColorTitle}>AllCoins</Text>
      <Button
        title="Go to Coin Info"
        onPress={() => navigation.navigate('CoinInfo')} // Navigate to CoinInfo screen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#030409",
  },
  yellowColorTitle: {
    color: "#EACC00",
    fontWeight: "800",
    fontSize: 45,
    marginTop: 35,
  },
});

export default AllCoins;
