'use strict';
(function () {
  var NUMBER_OF_SHOWN_PINS = 3;
  var MAP_START = {
    x: 300,
    y: 100
  };
  var MAP_FINISH = {
    x: 1160,
    y: 640
  };
  var pinMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  var filters = document.querySelector('.tokyo__filters');

  window.map = {
    pinPointerPositionX: {
      min: MAP_START.x + window.pin.pointerPosition.left,
      max: MAP_FINISH.x + window.pin.pointerPosition.left
    },
    pinPointerPositionY: {
      min: MAP_START.y + window.pin.pointerPosition.top,
      max: MAP_FINISH.y + window.pin.pointerPosition.top
    }
  };
  var onPopupOfferEscPress = function (event) {
    window.util.isEscEvent(event, function () {
      if (window.pin.pinActive) {
        window.util.hideElement(offerDialog);
        window.pin.removeActivePin();
      }
    });
  };

  var activatePinAndOffer = function (target) {
    window.pin.removeActivePin();
    target.classList.add('pin--active');
    window.card.show(target);
    window.pin.pinActive = pinMap.querySelector('.pin--active');
    document.addEventListener('keydown', onPopupOfferEscPress);
  };

  var deactivatePinAndOffer = function () {
    window.pin.removeActivePin();
    window.util.hideElement(offerDialog);
    document.removeEventListener('keydown', onPopupOfferEscPress);
  };

  var onPinMapClick = function (event) {
    var target = event.target;
    if (target.parentNode.classList.contains('pin') && !target.parentNode.classList.contains('pin__main')) {
      activatePinAndOffer(target.parentNode);
    } else if (target.classList.contains('pin') && !target.parentNode.classList.contains('pin__main')) {
      activatePinAndOffer(target);
    }
  };
  var onPinMapKeydown = function (event) {
    var target = event.target;
    window.util.isEnterEvent(event, function () {
      if (target.parentNode.classList.contains('pin') && !target.parentNode.classList.contains('pin__main')) {
        activatePinAndOffer(target.parentNode);
      } else if (target.classList.contains('pin') && !target.parentNode.classList.contains('pin__main')) {
        activatePinAndOffer(target);
      }
    });
  };

  var onOfferDialogCloseClick = function () {
    deactivatePinAndOffer();
  };
  var onOfferDialogCloseKeydown = function (event) {
    window.util.isEnterEvent(event, deactivatePinAndOffer);
  };

  var removeAllPins = function () {
    var pins = document.querySelectorAll('.pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('pin__main')) {
        pinMap.removeChild(it);
      }
    });
  };

  var generateOffersID = function (offers) {
    offers.forEach(function (it, index) {
      it.id = index;
    });
  };

  var generatePinsOnMap = function (maxNumberToShow) {
    window.util.hideElement(offerDialog);
    removeAllPins();
    window.filters.updateSelected();
    var suitableOffers = window.map.offers.filter(window.filters.isSuitableOffer.bind(window.filters));
    var pinFragment = document.createDocumentFragment();
    var pinsToShow = maxNumberToShow || suitableOffers.length;
    for (var j = 0; j < pinsToShow; j++) {
      pinFragment.appendChild(window.pin.generatePinElement(suitableOffers[j], j));
    }
    pinMap.appendChild(pinFragment);
  };

  var onSuccessLoad = function (offers) {
    window.map.offers = offers;
    generateOffersID(window.map.offers);
    generatePinsOnMap(NUMBER_OF_SHOWN_PINS);
    filters.addEventListener('change', function () {
      window.debounce(generatePinsOnMap);
    });
  };

  var onErrorLoad = function (errorMessage) {
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

  window.backend.load(onSuccessLoad, onErrorLoad);

  pinMap.addEventListener('click', onPinMapClick);
  pinMap.addEventListener('keydown', onPinMapKeydown);
  offerDialogClose.addEventListener('click', onOfferDialogCloseClick);
  offerDialogClose.addEventListener('keydown', onOfferDialogCloseKeydown);
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
