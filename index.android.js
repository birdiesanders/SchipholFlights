/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Animated,
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TextInput,
  ToastAndroid,
  Image,
  RefreshControl,
  TouchableOpacity, ReportableEvent as error
} from 'react-native';
//import Header from './Header';
//import AnimatedList from 'react-native-animated-list';
let _listView: ListView;

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
    };
  }

  componentDidMount() {
    Animated.timing(                            // Animate over time
      this.state.fadeAnim,                      // The animated value to drive
      {
        toValue: 1,                             // Animate to opacity: 1, or fully opaque
      }
    ).start();                                  // Starts the animation
  }

  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,          // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class SchipholFlights extends Component {
  constructor(props) {
    super(props);

    this._onLoadMore = this._onLoadMore.bind(this);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      refreshing: false,
      pageNumber: 0,
      pageSelectText: "Page Number",
      flightsData: ds.cloneWithRows([]),
    };
  }


  fetchFlightsData() {

    var url = 'https://api.schiphol.nl/public-flights/flights?app_id=44b654bb&app_key=9e13b015fc8a2a97c2ae3cce83175846&includedelays=true&page=' + this.state.pageNumber + '&sort=%2Bscheduletime';
    // var url = 'https://facebook.github.io/react-native/movies.json';
    this.setState({refreshing: true});

    fetch(url, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'ResourceVersion': 'v3'
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          flightsData: this.state.flightsData.cloneWithRows(jsonData.flights),
        });
        this.setState({refreshing: false});
      })
      .catch(error => ToastAndroid.show('Error Fetching Flight Data! ', ToastAndroid.LONG))
      .done();
    //if(error){(this.setState({refreshing: false}));}
  }

  _onLoadMore(pageNumber) {
    //this.setState({refreshing: true});
    this.setState({pageNumber: pageNumber});
    // this.fetchFlightsData();
    setTimeout(function () {
      // _listView.scrollTo({y: 0});
      this.fetchFlightsData();
      //this.forceUpdate();
      _listView.scrollTo({y: 0});
    }.bind(this), 0);
    //this.setState({refreshing: false});
    // this.state.setState.pageNumber = this.state.pageNumber + 1;
  };

  _onRefresh() {
    //this.fetchFlightsData();
    setTimeout(function () {
      this.fetchFlightsData();
      //this.forceUpdate()
    }.bind(this), 0);

  }

  //     var url = 'https://api.schiphol.nl/public-flights/flights?app_id=44b654bb&app_key=9e13b015fc8a2a97c2ae3cce83175846';
  //     this.setState({refreshing: true});
  //     fetch(url, {
  //         headers: {
  //             'Accept': 'application/json',
  //             'ResourceVersion': 'v3'
  //         }
  //     })
  //         .then(response => response.json())
  //         .then(jsonData => {
  //             this.setState({
  //                 flightsData: this.state.flightsData.cloneWithRows(jsonData.flights),
  //             });
  //         })
  //         .catch(error => console.log('Error fetching: ' + error))
  //         .then(() => {
  //             this.setState({refreshing: false});
  //         });
  // }

  componentDidMount() {
    this.fetchFlightsData();
  }

  render() {

    return (

        <ListView
          ref={(listView) => {
            _listView = listView;
          }}
          renderHeader={() => this.renderHeader() }
          renderFooter={() => this.renderFooter() }
          dataSource={this.state.flightsData}
          renderRow={this.renderRow}
          style={styles.container}
          enableEmptySections={true}
          elevation={2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
    );
  }

  renderHeader() {
    return (

      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('./schiphollogo.png')}
        />
        {/*<Text style={styles.titleText}>Schiphol Airport Flights</Text>*/}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this._onLoadMore(0)}
        >
          <Text style={styles.buttonText}>First Page</Text>
        </TouchableOpacity><TouchableOpacity
        style={styles.headerButton}
        onPress={() => this._onLoadMore((this.state.pageNumber > 0) ? this.state.pageNumber - 1 : this.state.pageNumber = 0)}
      >
        <Text style={styles.buttonText}>Previous Page</Text>
      </TouchableOpacity><TouchableOpacity
        style={styles.headerButton}
        onPress={() => this._onLoadMore(this.state.pageNumber + 1)}
      >
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>
        <FadeInView><Text style={{textAlign: 'right'}}>Page {this.state.pageNumber + 1}</Text></FadeInView>
      </View>
    );
  }

  _renderHeader() {
    return (

      <ToolbarAndroid
      logo={require('./schiphollogo.png')}
      title={"Schiphol airport Flights"}
      />
    );
  }

  renderFooter() {

    return (

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => this._onLoadMore(0)}
        >
          <Text style={styles.buttonText}>First Page</Text>
        </TouchableOpacity><TouchableOpacity
        style={styles.footerButton}
        onPress={() => this._onLoadMore((this.state.pageNumber > 0) ? this.state.pageNumber - 1 : this.state.pageNumber = 0)}
      >
        <Text style={styles.buttonText}>Previous Page</Text>
      </TouchableOpacity><TouchableOpacity
        style={styles.footerButton}
        onPress={() => this._onLoadMore(this.state.pageNumber + 1)}
      >
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.flightRow}>
        {/*<Image*/}
        {/*//source={{uri:'https://image.tmdb.org/t/p/w500_and_h281_bestv2/'+rowData.poster_path}}*/}
        {/*resizeMode='cover'*/}
        {/*style={styles.img} />*/}
        <Text style={styles.txt}>{rowData.flightName} (Flight {rowData.flightNumber}) (Scheduled Takeoff
          Time: {rowData.scheduleTime} {rowData.scheduleDate})</Text>
        <Text style={styles.txt}>Destination: {rowData.route.destinations} | Flight
          Status: {rowData.publicFlightState.flightStates.toString()} | Gate: {rowData.gate} | Flight
          direction: {rowData.flightDirection == 'A' ? 'Arriving' : 'Departing'}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    elevation: 0,
  },
  flightRow: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    elevation: 1
  },
  img: {
    // flex: 1,
    height: 50,
    width: 150,
    margin: 0
  },
  txt: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left'
  },
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  header: {
    flex: 1,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'steelblue',

  },
  headerButton: {
    elevation: 0,
    backgroundColor: 'steelblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'steelblue',

  },
  footerButton: {
    elevation: 0,
    backgroundColor: 'steelblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    color: '#8E8E8E',
  },
  buttonText: {
    fontSize: 16,
  },

});


AppRegistry.registerComponent('SchipholFlights', () => SchipholFlights);
