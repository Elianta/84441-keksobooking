'use strict';
(function () {
  var OFFER_TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };
  var offerDialog = document.getElementById('offer-dialog');
  var titleDialog = offerDialog.querySelector('.dialog__title');
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var replaceOfferType = function (type) {
    return OFFER_TYPES[type];
  };

  var generateOfferFeatureContainer = function (array) {
    var featuresFragment = document.createDocumentFragment();
    array.forEach(function (it) {
      var featureContainer = document.createElement('span');
      featureContainer.className = 'feature__image';
      featureContainer.classList.add('feature__image--' + it);
      featuresFragment.appendChild(featureContainer);
    });
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
    show: function (target) {
      var pinID = target.dataset.id;
      var oldDialog = offerDialog.querySelector('.dialog__panel');
      var newDialog = renderLodgePopupOffer(window.map.offers[pinID]);
      window.util.showElement(offerDialog);
      offerDialog.replaceChild(newDialog, oldDialog);
      titleDialog.querySelector('img').src = generateTitleImgSource(window.map.offers[pinID]);
    }
  };
})();
