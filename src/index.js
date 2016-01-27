var st         = require("sizetables");
var tableCache = {};

// Generates a sizetable for the given font family and size.
// generateTable :: String -> Number -> SizeTable
var generateTable = function (f, s) {
  return st.calculateSizeTable(s + "px " + f, st.defaultCharSet());
};

// Also ensures there is a table added in cache if required.
// getTable :: String -> Number -> SizeTable
var getTable = function (f, s) {
  if (!tableCache[f])
    tableCache[f] = {};

  if (!tableCache[f][s])
    tableCache[f][s] = generateTable(f, s);

  return tableCache[f][s];
};

// Estimate what the first line of copy would be from given text.
// getFirstLine :: SizeTable -> String -> Number -> String
var getFirstLine = function (t, txt, w) {
  var words   = txt.split(" ");
  var current = "";

  // Keep adding words until the first line overflows.
  while (st.measureText(current, t) < w && words.length)
    current += words.shift() + " ";

  return current;
};

// Find a nice font size for a text given a containing width.
// Params: font family, container width, body text, candidate font size.
// getNiceSize :: String -> Number -> String -> Number -> Number
var getNiceSize = function (f, w, txt, s) {
  var line = getFirstLine(getTable(f, s), txt, w);

  // If it is a short string, do nothing.
  if (text.length < 10)                         return s;
  // Inclusively clamp output size to 10 and 72.
  if (s <= 10 || s >= 72)                       return s;
  // If we have reached an appropriate size, return it.
  if (line.length - 1 > 60 && line.length < 75) return s;

  return getNiceSize(f, w, txt, line.length > 75 ? s + 0.5 : s - 0.5);
};

exports.getNiceSize = getNiceSize;
