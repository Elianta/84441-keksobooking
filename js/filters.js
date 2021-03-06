'use strict';
(function () {
  var CASE_ANY = 'any';
  var CASE_LOW = 'low';
  var CASE_MIDDLE = 'middle';
  var CASE_HIGH = 'high';
  var formWithFilters = document.querySelector('.tokyo__filters');
  var typeFilter = formWithFilters.querySelector('#housing_type');
  var priceFilter = formWithFilters.querySelector('#housing_price');
  var roomsFilter = formWithFilters.querySelector('#housing_room-number');
  var guestsFilter = formWithFilters.querySelector('#housing_guests-number');

  var getArrayOfSelectedItems = function (formElement, name) {
    var result = [];
    var array = formElement.elements[name];
    array.forEach(function (it) {
      if (it.checked) {
        result.push(it.value);
      }
    });
    return result;
  };

  var isSuitableType = function (offer, selectedFilters) {
    return (selectedFilters.type === offer.type || selectedFilters.type === 'any' || false);
  };

  var isSuitablePrice = function (offer, selectedFilters) {
    var price = selectedFilters.price;
    var priceBreakPointLow = 10000;
    var priceBreakPointHigh = 50000;
    switch (price) {
      case CASE_ANY:
        return true;
      case CASE_LOW:
        return (offer.price < priceBreakPointLow);
      case CASE_MIDDLE:
        return (offer.price >= priceBreakPointLow && offer.price <= priceBreakPointHigh) || false;
      case CASE_HIGH:
        return (offer.price > priceBreakPointHigh);
    }
    return false;
  };

  var isSuitableNumber = function (offer, offerKeyString, selectedFilters) {
    var number = selectedFilters[offerKeyString];
    if (number !== 'any') {
      return +number === offer[offerKeyString];
    }
    return true;
  };

  var areSuitableFeatures = function (array1, array2) {
    if (array1.length === 0) {
      return true;
    } else {
      for (var i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) === -1) {
          return false;
        }
      }
      return true;
    }
  };

  window.filters = {
    selected: '',
    updateSelected: function () {
      this.selected = {
        type: typeFilter.selectedOptions[0].value,
        price: priceFilter.selectedOptions[0].value,
        rooms: roomsFilter.selectedOptions[0].value,
        guests: guestsFilter.selectedOptions[0].value,
        features: getArrayOfSelectedItems(formWithFilters, 'feature')
      };
    },
    isSuitableOffer: function (offer) {
      var objectInOfferToCheck = offer.offer;
      var selectedFilters = this.selected;
      if (isSuitableType(objectInOfferToCheck, selectedFilters)) {
        if (isSuitablePrice(objectInOfferToCheck, selectedFilters)) {
          if (isSuitableNumber(objectInOfferToCheck, 'rooms', selectedFilters)) {
            if (isSuitableNumber(objectInOfferToCheck, 'guests', selectedFilters)) {
              return (areSuitableFeatures(selectedFilters.features, objectInOfferToCheck.features));
            }
          }
        }
      }
      return false;
    }
  };
})();
