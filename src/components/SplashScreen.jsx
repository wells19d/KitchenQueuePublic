//*SplashScreen.jsx
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';

const SplashScreen = () => {
  const logo = require('../images/AppLogo_350.png');
  return (
    <View style={styles.container}>
      <View style={{marginBottom: -24}}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={{position: 'absolute', top: '44%', left: '50%'}}>
        <ActivityIndicator size="large" color="#29856c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    padding: 5,
    fontFamily: 'Montserrat-Bold',
  },
  indicator: {
    marginVertical: 5,
    paddingTop: 8,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 6,
  },
  image: {},
});

export default SplashScreen;
