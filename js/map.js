'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var activePin;
var offerDialogClose = offerDialog.querySelector('.dialog__close');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var offerTitlesCopy = OFFER_TITLES.slice();

var getRandomFromRange = function (min, max) {
  return (Math.random() * (max - min) + min);
};

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('hidden');
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

var generatePinElement = function (object, j) {
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

var removeActivePin = function () {
  activePin = pinMap.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

var showAndUpdateOfferDialog = function (target) {
  var pinID = target.dataset.id;
  var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
  var newDialogPanel = renderLodgePopupOffer(offers[pinID]);
  showElement(offerDialog);
  offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
  dialogTitle.querySelector('img').src = generateTitleImgSource(offers[pinID]);
};

var onPopupOfferEscPress = function (event) {
  if (activePin && event.keyCode === ESC_KEYCODE) {
    hideElement(offerDialog);
    removeActivePin();
  }
};

// Generating the array 'offers' of offer objects
var offers = [];
for (var i = 1; i < 9; i++) {
  offers.push(generateOffer(i));
}
// Generating pins on map for each offer object
var pinFragment = document.createDocumentFragment();
for (var j = 0; j < offers.length; j++) {
  pinFragment.appendChild(generatePinElement(offers[j], j));
}
pinMap.appendChild(pinFragment);

pinMap.addEventListener('click', function (event) {
  var target = event.target.parentNode;
  if (target.classList.contains('pin')) {
    removeActivePin();
    target.classList.add('pin--active');
    showAndUpdateOfferDialog(target);
    activePin = pinMap.querySelector('.pin--active');
    document.addEventListener('keydown', onPopupOfferEscPress);
  }
});
pinMap.addEventListener('keydown', function (event) {
  var target = event.target;
  if (target.classList.contains('pin') && event.keyCode === ENTER_KEYCODE) {
    removeActivePin();
    target.classList.add('pin--active');
    showAndUpdateOfferDialog(target);
    document.addEventListener('keydown', onPopupOfferEscPress);
  }
});
offerDialogClose.addEventListener('click', function () {
  removeActivePin();
  hideElement(offerDialog);
  document.removeEventListener('keydown', onPopupOfferEscPress);
});
offerDialogClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    removeActivePin();
    hideElement(offerDialog);
    document.removeEventListener('keydown', onPopupOfferEscPress);
  }
});
