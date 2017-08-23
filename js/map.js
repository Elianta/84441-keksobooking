'use strict';
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.getElementById('offer-dialog');
var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var offerTitlesCopy = OFFER_TITLES.slice();

var getRandomFromRange = function (min, max) {
  return (Math.random() * (max - min) + min);
};

var addZeros = function (number) {
  number = String(number);
  if (number.length < 2) {
    number = '0' + number;
  }
  return number;
};

var getUniqueTitle = function (array) {
  var randomElement = Math.floor(getRandomFromRange(0, array.length));
  var uniqueTitle = array[randomElement];
  array.splice(randomElement, 1);
  return uniqueTitle;
};

var getRandomArray = function (array) {
  array = array.slice(0, 1 + Math.floor(getRandomFromRange(0, array.length)));
  return array;
};

var generateOffer = function (id) {
  var avatarTemplate = 'img/avatars/user{{xx}}.png';
  var location = {
    x: Math.floor(getRandomFromRange(300, 900)),
    y: Math.floor(getRandomFromRange(100, 500))
  };
  var author = {
    avatar: avatarTemplate.replace('{{xx}}', addZeros(id))
  };
  var offer = {
    title: getUniqueTitle(offerTitlesCopy),
    address: location.x + ', ' + location.y,
    price: Math.floor(getRandomFromRange(1000, 10000)),
    type: OFFER_TYPES[Math.floor(getRandomFromRange(0, OFFER_TYPES.length))],
    rooms: Math.floor(getRandomFromRange(1, 5)),
    checkin: CHECKIN_TIMES[Math.floor(getRandomFromRange(0, CHECKIN_TIMES.length))],
    checkout: CHECKOUT_TIMES[Math.floor(getRandomFromRange(0, CHECKOUT_TIMES.length))],
    features: getRandomArray(FEATURES),
    description: '',
    photos: []
  };
  offer.guests = offer.rooms * 2;
  return {
    location: location,
    author: author,
    offer: offer
  };
};

var generatePinElement = function (object) {
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
  return pinElement;
};

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

var Offers = [];
for (var i = 0; i < 8; i++) {
  Offers.push(generateOffer(i + 1));
}

var pinFragment = document.createDocumentFragment();
for (var j = 0; j < Offers.length; j++) {
  pinFragment.appendChild(generatePinElement(Offers[j]));
}

pinMap.appendChild(pinFragment);

var newDialogPanel = renderLodgePopupOffer(Offers[0]);

offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
dialogTitle.querySelector('img').src = generateTitleImgSource(Offers[0]);
