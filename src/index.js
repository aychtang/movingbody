var st         = require("sizetables");
var tableCache = {};

var generateTable = function (font, size) {
  return st.calculateSizeTable( size + "px " + font, st.defaultCharSet() );
};

// Also ensures there is a table added in cache if required.
var getTable = function (font, size) {
  if (!tableCache[font])
    tableCache[font] = {};

  if (!tableCache[font][size])
    tableCache[font][size] = generateTable(font, size);

  return tableCache[font][size];
};

var getFirstLine = function(table, text, width) {
  var words   = text.split(" ");
  var current = "";
  while (st.measureText(current, table) < width && words.length)
    current += (words.shift() + " ");
  return current;
};

// Find a nice font size for a text given a containing width.
var getNiceSize = function (font, width, text, size) {
  var line = getFirstLine(getTable(font, size), text, width);
  if (line.length > 50 && line.length < 75) return size;
  if (text.length < 10)                     return size;
  if (size < 11 || size > 72) return size;
  return getNiceSize(font, width, text, line.length > 75 ? size + 0.5 : size - 0.5);
};

exports.getNiceSize = getNiceSize;
