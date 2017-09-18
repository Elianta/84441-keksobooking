'use strict';
(function () {
  var PIN_BACKGROUND_WIDTH = 56;
  var PIN_BACKGROUND_HEIGHT = 75;
  var pinMap = document.querySelector('.tokyo__pin-map');

  window.pin = {
    pinActive: '',
    pointerPosition: {
      left: -PIN_BACKGROUND_WIDTH / 2,
      top: -PIN_BACKGROUND_HEIGHT
    },
    generatePinElement: function (object) {
      var pinElement = document.createElement('div');
      pinElement.className = 'pin';
      pinElement.style.left = (object.location.x + this.pointerPosition.left) + 'px';
      pinElement.style.top = (object.location.y + this.pointerPosition.top) + 'px';
      pinElement.innerHTML = '<img src="' + object.author.avatar + '" class="rounded" width="40" height="40">';
      pinElement.dataset.id = object.id;
      pinElement.tabIndex = object.id;
      return pinElement;
    },
    removeActivePin: function () {
      this.pinActive = pinMap.querySelector('.pin--active');
      if (this.pinActive) {
        this.pinActive.classList.remove('pin--active');
      }
    }
  };
})();
