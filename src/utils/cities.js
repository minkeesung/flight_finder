export default function convert_city_to_airportcode(city) {
  city = city.toLowerCase()

  if (city === "los angeles") {
    return "LAX"
  } else if (city === "denver") {
    return "DEN"
  } else if (city === "new york city") {
    return "NYC"
  } else {
    return city
  }
}
