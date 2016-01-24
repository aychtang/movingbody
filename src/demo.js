var mb = require("./index");

// Muh demo.

var str = "The font property of the Canvas 2D API specifies the current text style being used when drawing text. This string uses the same syntax as the CSS font specifier. The default font is 10px sans-serif.";
var div = document.querySelector(".text-container");
div.textContent = str;

var resize = function () {
  div.style.fontSize = mb.getNiceSize("Georgia", div.clientWidth, str, 72);
  window.requestAnimationFrame(resize);
};

window.requestAnimationFrame(resize);
