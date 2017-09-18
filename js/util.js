'use strict';
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    isEscEvent: function (event, action) {
      if (event.keyCode === window.util.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === window.util.ENTER_KEYCODE) {
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
