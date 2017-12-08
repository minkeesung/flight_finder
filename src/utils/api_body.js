export default function reqBody(
  origin,
  destination,
  departure_date,
  arrival_date,
  numOfGuests,
  budget
) {
  return {
    request: {
      passengers: { adultCount: parseInt(`${numOfGuests}`) },
      slice: [
        {
          origin: `${origin}`,
          destination: `${destination}`,
          date: `${departure_date}`,
          maxStops: 0
        },
        {
          origin: `${destination}`,
          destination: `${origin}`,
          date: `${arrival_date}`
        }
      ],
      solutions: '5'
    }
  };
}
