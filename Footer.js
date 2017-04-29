/**
 * Created by birdie on 4/25/17.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as console from "react-native";
import * as index from '../WebstormProjects/SchipholFlights/index.android';
//import fetchFlightsData from './FetchFlightsData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  titleText: {
    color: '#8E8E8E',
  },
});



const Footer = (props) => (



    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={}>
        <Text style={styles.titleText}>Load More</Text>
      </TouchableOpacity>
    </View>
);

// function fetchFlightsData(pageNumber) {
//     var url = 'https://api.schiphol.nl/public-flights/flights?app_id=44b654bb&app_key=9e13b015fc8a2a97c2ae3cce83175846&includedelays=true&page=' + pageNumber + '&sort=%2Bscheduletime';
//     // var url = 'https://facebook.github.io/react-native/movies.json';
//     fetch(url, {
//       headers: {
//         'Accept': 'application/json',
//         'ResourceVersion': 'v3'
//       }
//     })
//       .then(response => response.json())
//       .then(jsonData => {
//         this.setState({
//           flightsData: this.state.flightsData.cloneWithRows(jsonData.flights),
//         });
//       })
//       .catch(error => console.log('Error fetching: ' + error));
//
//
//   }


export default Footer;