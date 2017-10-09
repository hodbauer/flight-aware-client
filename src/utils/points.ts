export function calculatePoints(track):number[] {
  let points = [];
  for (let point of track) {
    points.push(point.longitude, point.latitude, point.altitude * 100);
  }

  return points;
}
