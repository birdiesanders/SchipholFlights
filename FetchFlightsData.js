/**
 * Created by birdie on 4/25/17.
 */
/**
 * Created by birdie on 4/25/17.
 */
export default function  fetchFlightsData(pageNumber) {
  var url = 'https://api.schiphol.nl/public-flights/flights?app_id=44b654bb&app_key=9e13b015fc8a2a97c2ae3cce83175846&includedelays=true&page=' + pageNumber + '&sort=%2Bscheduletime';
  // var url = 'https://facebook.github.io/react-native/movies.json';
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'ResourceVersion': 'v3'
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      setState({
        flightsData: this.state.flightsData.cloneWithRows(jsonData.flights),
      });
    })
    .catch(error => console.log('Error fetching: ' + error));


}