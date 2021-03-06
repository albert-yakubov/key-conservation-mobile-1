import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/HeyThere.js';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { logout } from '../../store/actions';

import Constants from 'expo-constants';

const HeyThereScreen = props => {
  const [state, setState] = useState(null);

  logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('userId', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    logout();
    // props.navigation.navigate('Loading');

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {
        setState({ result });
      });
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {
        setState({ result });
      });
    }
    props.navigation.navigate('Logout');
  };
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg2.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <TouchableOpacity onPress={this.logoutPress} style={styles.arrowView}>
        <Image source={require('../../assets/images/onboarding/w_arrow.png')} />
      </TouchableOpacity>
      <View style={styles.obBody}>
        <View style={styles.spacer} />
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>Hey There!</Text>
          <Text style={styles.obSubtitle}>
            We can't wait to get your organization on board.
          </Text>
          <Text style={styles.obText}>
            After just a brief overview of our process, you'll be on your way to
            creating a custom page for your organization.
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('ToExpect');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeyThereScreen;
