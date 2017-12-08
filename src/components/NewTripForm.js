import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchTrips } from '../actions';
import { withRouter } from 'react-router-dom';
import { DateTimePicker, DropdownList } from 'react-widgets'
// import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import '../css/NewTripForm.css'
import '../css/grid.css'
import Ionicon from 'react-ionicons'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import Button from 'react-bootstrap/lib/Button'
import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)

const locations = [ 'NYC', 'Los Angeles' ]
const num_passengers = ['1', '2', '3', '4', '5', '6']

class NewTripForm extends Component {


  renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange} />

  renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
      className="datetime"
      onChange={onChange}
      format="DD MMM YYYY"
      time={showTime}
      value={!value ? null : new Date(value)}
    />

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
        <div className={field.input.name}>
          <div className={className}>
            <div className="">
              <label className={'text-white label_'}>
                {field.label}
              </label>
            </div>
            <div className="">
                <input className="form-control" type="text" {...field.input} />
              <div className="text-help">
                {touched ? error : ''}
              </div>
            </div>
          </div>
        </div>
    );
  }

  onSubmit(values) {
    console.log(values)
    this.props.fetchTrips(values, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="wrapper">
        <h1>Flight Finder</h1>
        <form className="trip-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="row">
          <div className="col span-1-of-2">
            <label>Origin</label>
            <Field
              name="origin"
              component={this.renderDropdownList}
              data={locations}
              valueField="value"
              textField="origin"/>
          </div>

            <div className="col span-1-of-2">
              <label>Destination</label>
              <Field
                name="destination"
                component={this.renderDropdownList}
                data={locations}
                valueField="value"
                textField="destination"/>
            </div>
          </div>
          <div className="row">
              <div className="col span-1-of-4">
                <div className="departure_date">
                    <label>Departure Date</label>
                    <Field
                      name="departure_date"
                      showTime={false}
                      component={this.renderDateTimePicker}
                    />
                </div>
              </div>
              <div className="col span-1-of-4">
                <div className="arrival_date">
                    <label>Arrival Date</label>
                    <Field
                      name="arrival_date"
                      showTime={false}
                      component={this.renderDateTimePicker}
                    />
                </div>
              </div>
              <div className="col span-1-of-4">
                <div className="num_guests">
                  <label>Number of Guests</label>
                  <Field
                    name="numGuests"
                    component={this.renderDropdownList}
                    data={num_passengers}
                    valueField="value"
                    textField="numGuests"/>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

        </div>



    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.budget) {
    errors.budget = 'Enter a budget!';
  }
  if (!values.origin) {
    errors.origin = 'Enter an origin!';
  }
  if (!values.numGuests) {
    errors.numGuests = 'Enter number of guests!';
  }
  if (!values.departure_date) {
    errors.departure_date = 'Enter a departure date!';
  }
  if (!values.destination) {
    errors.destination = 'Enter a destination!';
  }

  if (!values.arrival_date) {
    errors.arrival_date = 'Enter an arrival date!';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'NewTripForm'
})(connect(null, { fetchTrips })(withRouter(NewTripForm)));
