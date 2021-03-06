import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

import EditButton from '../components/EditButton';
import SettingsButton from '../components/SettingsButton';

import styles from '../constants/screens/MyDetailScreen';

class MyDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'Lato-Bold'
      },
      headerLeft: <SettingsButton navigation={navigation} settingsRoute={'AccountSettings'} />,
      headerRight: <EditButton navigation={navigation} editRoute={'EditPro'} />
    };
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollBG}>
        <DetailHeader
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUserProfile}
        />
        <DetailAboutUs
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUserProfile}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps)(MyDetailsScreen);
