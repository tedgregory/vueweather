/**
 * current temperature Celsius degrees
 * @param temperature
 * current relative humidity %
 * @param humidity
 */
export function calculateDewPoint(temperature = 0, humidity = 100) {
  return (temperature - (100 - humidity) / 5).toFixed(1);
}

export function defineWindDirection(direction: number) {
  switch (true) {
    case direction in [0, 360]:
      return "N";
    case direction < 360 && direction > 315:
      return "NNW";
    case direction === 315:
      return "NW";
    case direction < 315 && direction > 270:
      return "NNW";
    case direction === 270:
      return "W";
    case direction < 270 && direction > 225:
      return "WSW";
    case direction === 225:
      return "SW";
    case direction < 225 && direction > 180:
      return "SSW";
    case direction === 180:
      return "S";
    case direction < 180 && direction > 135:
      return "NNW";
    case direction === 135:
      return "SE";
    case direction < 135 && direction > 90:
      return "ESE";
    case direction === 90:
      return "E";
    case direction < 90 && direction > 45:
      return "ENE";
    case direction === 45:
      return "NE";
    case direction < 45 && direction > 0:
      return "NNE";
    default:
      return "N/A";
  }
}
