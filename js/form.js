'use strict';
(function () {
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var selectType = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var submit = form.querySelector('.form__submit');
  var inputs = form.querySelectorAll('input');

  var capacitySettings = {
    // Numbers in the array show which select options will be displayed in the list of capacity select.
    roomNumber1: ['1'],
    roomNumber2: ['2', '1'],
    roomNumber3: ['3', '2', '1'],
    roomNumber100: ['0']
  };

  var setupMinLength = function (event, minlength) {
    var target = event.target;
    if (target.value.length < minlength) {
      target.setCustomValidity('Имя должно состоять минимум из ' + minlength + ' символов');
    } else {
      target.setCustomValidity('');
    }
  };

  var synchronizeTimeInAndOut = function () {
    for (var n = 0; n < selectTimeOut.options.length; n++) {
      if (selectTimeOut.options[n].value === selectTimeIn.selectedOptions[0].value) {
        selectTimeOut.options[n].selected = true;
      }
    }
  };

  var synchronizeMinPrice = function () {
    var selectedOption = selectType.selectedOptions[0].value;
    if (selectedOption === 'flat') {
      price.min = '0';
      price.placeholder = '0';
    } else if (selectedOption === 'bungalo') {
      price.min = '1000';
      price.placeholder = '1000';
    } else if (selectedOption === 'house') {
      price.min = '5000';
      price.placeholder = '5000';
    } else if (selectedOption === 'palace') {
      price.min = '10000';
      price.placeholder = '10000';
    }
  };

  var synchronizeCapacity = function () {
    var capacitySettingsKey = 'roomNumber' + roomNumber.selectedOptions[0].value;
    for (var p = 0; p < capacity.options.length; p++) {
      var optionsToShow = capacitySettings[capacitySettingsKey];
      var optionValue = capacity.options[p].value;
      var selectedOption;
      if (optionsToShow.indexOf(optionValue) !== -1) {
        capacity.options[p].hidden = false;
      } else {
        capacity.options[p].hidden = true;
      }
      if (optionsToShow[0] === optionValue) {
        selectedOption = p;
      }
    }
    capacity.options[selectedOption].selected = true;
  };

  var onSubmitClick = function (event) {
    var stopSubmit;
    for (var t = 0; t < inputs.length; t++) {
      var input = inputs[t];
      if (input.checkValidity() === false) {
        input.style.border = '1px solid red';
        stopSubmit = true;
      } else {
        input.style.border = 'none';
      }
    }
    if (stopSubmit) {
      event.preventDefault();
    }
  };

  synchronizeMinPrice();
  synchronizeCapacity();

  selectTimeIn.addEventListener('change', synchronizeTimeInAndOut);
  selectType.addEventListener('change', synchronizeMinPrice);
  roomNumber.addEventListener('change', synchronizeCapacity);
  title.addEventListener('input', function () {
    setupMinLength(event, 30);
  });
  submit.addEventListener('click', onSubmitClick);
})();
