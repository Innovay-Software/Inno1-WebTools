function hexByteToBinary(hexByte: string) {
  let parsedInt = parseInt(hexByte, 16);
  if (isNaN(parsedInt)) {
    return "00000000";
  }
  return parsedInt.toString(2).padStart(8, "0");
}

function hexStringToBinaryArray(
  hexString: string,
  segmentLength = 2
): string[] {
  let hexLength = hexString.length;
  let missingZeros = hexLength % segmentLength;
  while (missingZeros > 0) {
    hexString = "0" + hexString;
    missingZeros -= 1;
  }
  hexLength = hexString.length;
  let hexArray = [...hexString.split("")];
  let binaryArray = [];
  for (var i = 0; i < hexLength; i += 2) {
    binaryArray.push(hexByteToBinary(hexArray[i] + hexArray[i + 1]));
  }
  return binaryArray;
}

function explodeString(str: string, unitWidth: number) {
  let strLength = str.length;
  let strComponents = [];
  for (var i = 0; i < strLength; i += unitWidth) {
    strComponents.push(str.substring(i, i + unitWidth));
  }
  return strComponents;
}

export default {
  hexByteToBinary,
  hexStringToBinaryArray,
  explodeString,
};
