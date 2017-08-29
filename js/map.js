'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.getElementById('offer-dialog');
  var offerDialogClose = offerDialog.querySelector('.dialog__close');

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
    window.card.showAndUpdateOfferDialog(target);
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

  // Generating pins on map for each offer object
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < window.offers.length; j++) {
    pinFragment.appendChild(window.pin.generatePinElement(window.offers[j], j));
  }
  pinMap.appendChild(pinFragment);

  pinMap.addEventListener('click', onPinMapEvent);
  pinMap.addEventListener('keydown', onPinMapEvent);
  offerDialogClose.addEventListener('click', onOfferDialogCloseEvent);
  offerDialogClose.addEventListener('keydown', onOfferDialogCloseEvent);
})();
