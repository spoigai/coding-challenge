/* * load list of coordinates from file and return a dictionary
 */
function readJson(filename) {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  return obj
}

function calculateDistanceBetweenPoints(pointA, pointB) {
  //sqrt((|xPoint - xOrigin|)^2 + (|yPoint - yOrigin|)^2)
  //console.log('calculating distance between points:', pointA, pointB)
  return Math.sqrt(Math.pow(Math.abs(pointA[0] - pointB[0]), 2) + Math.pow(Math.abs(pointA[1] - pointB[1]), 2))
}

/*
 * parse string coordinates given in db file into [int, int] array
 */
function parseCoordinates(stringCoordinates) {
  return stringCoordinates.split(',').map(function(item) { return Number(item)});
}

/*
 * return a list of distances from origin for each coordinate in list
 */
function calculateDistances(origin, listOfCoordinates) {
  //console.log('starting calculating distances for all coordinates');
  var calculatedList = []
  // loop through each coordinate
  for (var idx in listOfCoordinates) {
    // calcualte distance between this coordinate and origin point
    var hyp = calculateDistanceBetweenPoints(origin, parseCoordinates(listOfCoordinates[idx].value));
    var newCoordinate = listOfCoordinates[idx];
    // save calculated distance in coordinates list
    newCoordinate['distance'] = hyp
    calculatedList.push(newCoordinate)
  }
  return calculatedList // return coordinates list with calculated distance
}

/*
 *
 */
function sortDictionary(dictionary, key) {
    dictionary.sort(function(a, b) { // overwrite sort function with our custom function
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
  });
  return dictionary;
}

/*
 *
 */
function findClosest(origin) {
    console.log('Looking for closest point to: ' + origin);
    var coords = readJson('db.json'); // read coordinates to search from db
    var distances = calculateDistances(origin, coords);  // valculated distances
    var sorted = sortDictionary(distances, 'distance'); // sort distances
    //console.log(sorted[0]);
    //return sorted[0]; // return the closest point to origin
    return sorted; // return closest point in sorted order
}

// Usage Example:
//var origin = [55,133];
//findClosest(origin);

