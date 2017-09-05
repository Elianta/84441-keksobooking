'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.getElementById('offer-dialog');
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  var mapStart = {
    x: 300,
    y: 100
  };
  var mapFinish = {
    x: 1160,
    y: 640
  };
  window.map = {
    pinPointerPositionX: {
      min: mapStart.x + window.pin.pointerPosition.left,
      max: mapFinish.x + window.pin.pointerPosition.left
    },
    pinPointerPositionY: {
      min: mapStart.y + window.pin.pointerPosition.top,
      max: mapFinish.y + window.pin.pointerPosition.top
    }
  };
  var onPopupOfferEscPress = function (event) {
    window.util.isEscEvent(event, function () {
      if (window.pin.activePin) {
        window.util.hideElement(offerDialog);
        window.pin.removeActivePin();
      }
    });
  };

  var activatePinAndOffer = function (target) {
    window.pin.removeActivePin();
    target.classList.add('pin--active');
    window.card.showCard(target);
    window.pin.activePin = pinMap.querySelector('.pin--active');
    document.addEventListener('keydown', onPopupOfferEscPress);
  };

  var deactivatePinAndOffer = function () {
    window.pin.removeActivePin();
    window.util.hideElement(offerDialog);
    document.removeEventListener('keydown', onPopupOfferEscPress);
  };

  var onPinMapEvent = function (event) {
    var target = event.target;
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === window.keycode.ENTER)) {
      if (target.parentNode.classList.contains('pin')) {
        activatePinAndOffer(target.parentNode);
      } else if (target.classList.contains('pin')) {
        activatePinAndOffer(target);
      }
    }
  };

  var onOfferDialogCloseEvent = function (event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === window.keycode.ENTER)) {
      deactivatePinAndOffer();
    }
  };

  var successHandler = function (offers) {
    window.offers = offers;
    // Generating pins on map for each offer object
    var pinFragment = document.createDocumentFragment();
    for (var j = 0; j < window.offers.length; j++) {
      pinFragment.appendChild(window.pin.generatePinElement(window.offers[j], j));
    }
    pinMap.appendChild(pinFragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.lineHeight = 2.0;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  pinMap.addEventListener('click', onPinMapEvent);
  pinMap.addEventListener('keydown', onPinMapEvent);
  offerDialogClose.addEventListener('click', onOfferDialogCloseEvent);
  offerDialogClose.addEventListener('keydown', onOfferDialogCloseEvent);
  pinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startPosition = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = {
        x: startPosition.x - moveEvent.clientX,
        y: startPosition.y - moveEvent.clientY
      };
      startPosition = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };
      var positionY = pinMain.offsetTop - shift.y;
      var positionX = pinMain.offsetLeft - shift.x;
      if (positionX > window.map.pinPointerPositionX.min && positionX < window.map.pinPointerPositionX.max) {
        pinMain.style.left = positionX + 'px';
      }
      if (positionY > window.map.pinPointerPositionY.min && positionY < window.map.pinPointerPositionY.max) {
        pinMain.style.top = positionY + 'px';
      }
      address.value = 'x: ' + positionX + ', y: ' + positionY;
    };
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
