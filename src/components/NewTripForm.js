import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchTrips } from '../actions';
import { withRouter } from 'react-router-dom';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)

class NewTripForm extends Component {


  renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label className="text-white">
          {field.label}
        </label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ''}
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
      <form id="trip-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Budget" name="budget" component={this.renderField} />
        <Field
          label="Number of Guests"
          name="numGuests"
          component={this.renderField}
        />
        <Field label="Origin" name="origin" component={this.renderField} />
        <Field label="Destination" name="destination" component={this.renderField} />
        <div>
          <label>Departure Date</label>
            <Field
              name="departure_date"
              showTime={false}
              component={this.renderDateTimePicker}
            />
        </div>
        <div>
          <label>Arrival Date</label>
            <Field
              name="arrival_date"
              showTime={false}
              component={this.renderDateTimePicker}
            />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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
  if (!values.arrival_date) {
    errors.arrival_date = 'Enter an arrival date!';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'NewTripForm'
})(connect(null, { fetchTrips })(withRouter(NewTripForm)));
