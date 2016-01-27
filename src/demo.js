var mb = require("./index");

// Muh demo.

var div       = document.querySelector(".text-container");
var str       = div.textContent;
var prevWidth = div.clientWidth + 1;

var resize = function () {
  var width = div.clientWidth;
  if (width !== prevWidth) {
    div.style.fontSize = mb.getNiceSize("Georgia", width, str, 71);
    prevWidth = width;
  }
  window.requestAnimationFrame(resize);
};

window.requestAnimationFrame(resize);
