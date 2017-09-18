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
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    }
  };
})();
