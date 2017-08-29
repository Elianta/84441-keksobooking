'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  window.pin = {
    activePin: '',
    generatePinElement: function (object, j) {
      var pinElement = document.createElement('div');
      var pinBackgroundWidth = 56;
      var pinBackgroundHeight = 75;
      var pinPointerPosition = {
        left: -pinBackgroundWidth / 2,
        top: -pinBackgroundHeight
      };
      pinElement.className = 'pin';
      pinElement.style.left = (object.location.x + pinPointerPosition.left) + 'px';
      pinElement.style.top = (object.location.y + pinPointerPosition.top) + 'px';
      pinElement.innerHTML = '<img src="' + object.author.avatar + '" class="rounded" width="40" height="40">';
      pinElement.dataset.id = j;
      pinElement.tabIndex = j;
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
