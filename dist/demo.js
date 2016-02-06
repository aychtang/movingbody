(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mb = require("./index");

// Muh demo.

var ps      = document.querySelectorAll(".text-container");
var prevWidth = ps[0].clientWidth + 1;

var resize = function () {
  var width = ps[0].clientWidth;
  if (width !== prevWidth) {
    Array.prototype.slice.call(ps).forEach((d) => {
      d.style.fontSize = mb.getNiceSize("Georgia", width, d.textContent, 71);
    });

    prevWidth = width;
  }
  window.requestAnimationFrame(resize);
};

window.requestAnimationFrame(resize);

},{"./index":2}],2:[function(require,module,exports){
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
  if (txt.length < 10)                          return s;
  // Inclusively clamp output size to 10 and 72.
  if (s <= 10 || s >= 72)                       return s;
  // If we have reached an appropriate size, return it.
  if (line.length - 1 > 60 && line.length < 75) return s;

  return getNiceSize(f, w, txt, line.length > 75 ? s + 0.5 : s - 0.5);
};

exports.getNiceSize = getNiceSize;

},{"sizetables":3}],3:[function(require,module,exports){
// Range covers most characters required for standard english text.
var defaultCharSet = function () {
  var set = [];
  for (var i = 48; i < 177; i++)
    set.push(String.fromCharCode(i));
  return set;
};

// Generation - depends on DOM + canvas measurement to produce a sizetable.

var measureChar = (function () {
  var canvas  = document.createElement("canvas");
  var context = canvas.getContext("2d");

  return function (f, c) {
    context.font = f;
    return context.measureText(c).width;
  };
}());

var calculateSizeTable = function (font, charSet) {
  var table = {};
  charSet.forEach(function (c) { table[c] = measureChar(font, c); });
  return table;
};

// Measurements - done purely outside of DOM with supplied sizetable.

var measureText = function (text, sizeTable) {
  var collectSizes = function (a, c) { return a + (sizeTable[c] || 8); };
  return text.split("").reduce(collectSizes, 0);
};

exports.measureText        = measureText;
exports.measureChar        = measureChar;
exports.defaultCharSet     = defaultCharSet;
exports.calculateSizeTable = calculateSizeTable;

},{}]},{},[1]);
