import axios from 'axios';
import reqBody from '../utils/api_body';
import parse_api_response from '../utils/parsing';
import convert_city_to_airportcode from '../utils/cities'
import { FETCH_TRIPS } from './types';

const API_KEY = 'AIzaSyBW6j4MVKhK1fRRHAc7FI28zn3PBGZO_Wc';
var API = require('qpx-express');
var qpx = new API(API_KEY);



export const fetchTrips = (values, history) => async dispatch => {
  let trips = 'something';
  let i = values.departure_date.toISOString().indexOf('T')
  let departure_date = values.departure_date.toISOString().substring(0,i)
  let n = values.arrival_date.toISOString().indexOf('T')
  let arrival_date = values.arrival_date.toISOString().substring(0,n)

  console.log('herrrro', reqBody(
    convert_city_to_airportcode(values.origin),
    convert_city_to_airportcode(values.destination),
    departure_date,
    arrival_date,
    values.numGuests,
    values.budget
  ))
  qpx.getInfo(
    reqBody(
      convert_city_to_airportcode(values.origin),
      convert_city_to_airportcode(values.destination),
      departure_date,
      arrival_date,
      values.numGuests
    ),
    await function(error, flights) {
      var trips = parse_api_response(error, flights);
      var stuff = trips;
      console.log('first', trips);

      history.push('/trips');
      dispatch({ type: FETCH_TRIPS, payload: trips });
    }
  );

  console.log('second', trips);

};
