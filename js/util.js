'use strict';
(function () {
  window.util = {
    isEscEvent: function (event, action) {
      if (event.keyCode === window.keycode.ESC) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === window.keycode.ENTER) {
        action();
      }
    },
    getRandomFromRange: function (min, max) {
      return (Math.random() * (max - min) + min);
    },
    getRandomFromArray: function (array) {
      return array[Math.floor(this.getRandomFromRange(0, array.length))];
    },
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    }
  };
})();
