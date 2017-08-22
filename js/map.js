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

var offerTitles = OFFER_TITLES.slice();

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
    title: getUniqueTitle(offerTitles),
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

var Offers = [];
for (var i = 0; i < 8; i++) {
  Offers.push(generateOffer(i + 1));
}
