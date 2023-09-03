import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import CarouselPage from './CarouselPage';

const MainPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.wrapper}>
        <Text style={styles.yellowColorTitle}>CrackedCrypto</Text>
        <CarouselPage />

        <View style={styles.descriptionContainer}>
   
          <Text style={styles.title}>Introducing CrackedCrypto</Text>
          <Text style={styles.description}>
            Unleash the Power of Decentralized Finance
          </Text>

          {/* Key Features */}
          <Text style={styles.sectionTitle}>Key Features:</Text>
          <Text style={styles.feature}>1. User-Friendly Interface</Text>
          <Text style={styles.feature}>2. Portfolio Management</Text>
          <Text style={styles.feature}>3. Secure Wallet Integration</Text>
          <Text style={styles.feature}>4. DeFi Marketplace</Text>
          <Text style={styles.feature}>5. Educational Resources</Text>
          <Text style={styles.feature}>6. Community Engagement</Text>
          <Text style={styles.feature}>7. Real-Time Market Data</Text>
          <Text style={styles.feature}>8. Cross-Platform Accessibility</Text>

          {/* Why Choose CrackedCrypto */}
          <Text style={styles.sectionTitle}>Why Choose CrackedCrypto?</Text>
          <Text style={styles.description}>
            CrackedCrypto is more than just a mobile app; it's your gateway to a
            decentralized financial future. With its user-friendly interface,
            robust security measures, and comprehensive suite of features,
            CrackedCrypto offers a holistic solution for anyone looking to
            engage with DeFi confidently and intelligently.
          </Text>

          {/* Call to Action */}
          <Text style={styles.description}>
            Join the growing community of crypto enthusiasts who have already
            harnessed the power of CrackedCrypto to navigate the ever-changing
            crypto landscape. Embrace the future of finance with a tool that
            empowers you to make informed decisions, seize opportunities, and
            unlock the full potential of your crypto assets.
          </Text>
          <Text style={styles.description}>
            Discover CrackedCrypto today and embark on a journey toward financial
            sovereignty in the exciting world of cryptocurrency and DeFi.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#030409",
  },
  yellowColorTitle: {
    color: "#EACC00",
    fontWeight: "800",
    fontSize: 45,
    marginTop: 20,
    marginBottom: 20,
    marginTop: 45,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 35,
    backgroundColor: "#FEFCF2",
    padding: 15,
    borderRadius: 10,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  feature: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 4,
  },
});

export default MainPage;
