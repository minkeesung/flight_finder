export default function(error, flights) {
  let trips = [];
  console.log('flights', flights);
  flights['trips']['tripOption'].forEach(function(trip) {
    let h = {};
    h['saleTotal'] = trip['saleTotal'];
    h['carrier'] = trip['slice'][0]['segment'][0]['flight']['carrier'];
    h['arrival_time_when_leaving_home'] =
      trip['slice'][0]['segment'][0]['leg'][0]['arrivalTime'];
    h['departure_time_when_leaving_home'] =
      trip['slice'][0]['segment'][0]['leg'][0]['departureTime'];
    h['arrival_time_when_coming_home'] =
      trip['slice'][1]['segment'][0]['leg'][0]['arrivalTime'];
    h['departure_time_when_coming_home'] =
      trip['slice'][1]['segment'][0]['leg'][0]['departureTime'];
    h['origin'] = trip['slice'][0]['segment'][0]['leg'][0]['origin'];
    h['destination'] = trip['slice'][0]['segment'][0]['leg'][0]['destination'];
    trips.push(h);
  });
  return trips;
}
