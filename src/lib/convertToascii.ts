export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const cleanedString = inputString.replace(/[^\x00-\x7F]+|\s+/g, "");
  return cleanedString;
}
