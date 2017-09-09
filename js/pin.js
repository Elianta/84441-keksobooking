'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinBackgroundWidth = 56;
  var pinBackgroundHeight = 75;
  window.pin = {
    activePin: '',
    pointerPosition: {
      left: -pinBackgroundWidth / 2,
      top: -pinBackgroundHeight
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
      this.activePin = pinMap.querySelector('.pin--active');
      if (this.activePin) {
        this.activePin.classList.remove('pin--active');
      }
    }
  };
})();
