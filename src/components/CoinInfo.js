import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


const CoinInfo = () => {
  return (
    <View style={styles.wrapper}>
    <Text style={styles.yellowColorTitle}>CoinInfo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      backgroundColor:"#030409"
    },
    yellowColorTitle:{
        color:"#EACC00",
        fontWeight: "800",
        fontSize:45,
        marginTop:35
    }
  });

export default CoinInfo