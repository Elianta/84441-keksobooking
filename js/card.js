'use strict';
(function () {
  var offerDialog = document.getElementById('offer-dialog');
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var replaceOfferType = function (type) {
    if (type === 'flat') {
      type = 'Квартира';
    } else if (type === 'bungalo') {
      type = 'Бунгало';
    } else {
      type = 'Дом';
    }
    return type;
  };

  var generateOfferFeatureContainer = function (array) {
    var featuresFragment = document.createDocumentFragment();
    for (var k = 0; k < array.length; k++) {
      var featureContainer = document.createElement('span');
      featureContainer.className = 'feature__image';
      featureContainer.classList.add('feature__image--' + array[k]);
      featuresFragment.appendChild(featureContainer);
    }
    return featuresFragment;
  };

  var generateTitleImgSource = function (object) {
    return object.author.avatar;
  };

  var renderLodgePopupOffer = function (object) {
    var lodgePopupOffer = lodgeTemplate.cloneNode(true);
    lodgePopupOffer.querySelector('.lodge__title').textContent = object.offer.title;
    lodgePopupOffer.querySelector('.lodge__address').textContent = object.offer.address;
    lodgePopupOffer.querySelector('.lodge__price').innerHTML = object.offer.price + '&#x20bd;/ночь';
    lodgePopupOffer.querySelector('.lodge__type').textContent = replaceOfferType(object.offer.type);
    lodgePopupOffer.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests + ' гостей в ' + object.offer.rooms + ' комнатах';
    lodgePopupOffer.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    lodgePopupOffer.querySelector('.lodge__features').appendChild(generateOfferFeatureContainer(object.offer.features));
    lodgePopupOffer.querySelector('.lodge__description').textContent = object.offer.description;
    return lodgePopupOffer;
  };

  window.card = {
    showAndUpdateOfferDialog: function (target) {
      var pinID = target.dataset.id;
      var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
      var newDialogPanel = renderLodgePopupOffer(window.offers[pinID]);
      window.util.showElement(offerDialog);
      offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
      dialogTitle.querySelector('img').src = generateTitleImgSource(window.offers[pinID]);
    }
  };
})();
