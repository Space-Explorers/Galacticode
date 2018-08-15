function myJoin(arr, delimiter) {
  if (delimiter === undefined) {
    delimiter = ",";
  }

  var newString = "";
  for (var i = 0; i < arr.length; i++) {
    if (i === arr.length-1) {
      newString += arr[i];
    } else {
      newString += arr[i] + delimiter;
    }
  }

  return newString;
}
