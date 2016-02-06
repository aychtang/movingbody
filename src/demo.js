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
