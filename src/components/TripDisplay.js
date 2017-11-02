import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TripDisplay extends Component {
  tripInfo(title, info) {
    return (
      <div>
        <span className="card-title">
          {title}
        </span>
        <p>
          {info}
        </p>
      </div>
    );
  }

  renderTrips() {
    return _.map(this.props.trips, trip => {
      return (
        <div className="card darken-1">
          <div className="card-content">
            {this.tripInfo('Ticket price', trip.saleTotal)}
            {this.tripInfo('Carrier', trip.carrier)}
            {this.tripInfo('Arrival time', trip.arrival_time_when_leaving_home)}
            {this.tripInfo(
              'Departure time',
              trip.departure_time_when_leaving_home
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    const { trips } = this.props;

    if (!trips) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {this.renderTrips()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { trips: state.trips };
}

export default connect(mapStateToProps)(withRouter(TripDisplay));
