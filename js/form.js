'use strict';
(function () {
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var checkinTime = form.querySelector('#timein');
  var checkoutTime = form.querySelector('#timeout');
  var apartmentType = form.querySelector('#type');
  var pricePerNight = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var submit = form.querySelector('.form__submit');
  var inputs = form.querySelectorAll('input');
  var address = form.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');
  var avatarFileChooser = document.querySelector('.notice__photo input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview');
  var photosFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var photosPreview = document.querySelectorAll('.form__photo');
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

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.lineHeight = 2.0;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.image.upload(avatarFileChooser, avatarPreview);
  window.image.upload(photosFileChooser, photosPreview);

  synchronizeCapacity();

  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], ['0', '1000', '5000', '10000'], syncValueWithMin);
  roomNumber.addEventListener('change', synchronizeCapacity);
  title.addEventListener('input', function () {
    setupMinLength(event, 30);
  });
  submit.addEventListener('click', onSubmitClick);
  address.addEventListener('change', function () {
    var str = address.value;
    var coords = str.match(/\d+/ig);
    var coordX = +coords[0];
    var coordY = +coords[1];
    if (coordX > window.map.pinPointerPositionX.max) {
      coordX = window.map.pinPointerPositionX.max;
    } else if (coordX < window.map.pinPointerPositionX.min) {
      coordX = window.map.pinPointerPositionX.min;
    }
    if (coordY > window.map.pinPointerPositionY.max) {
      coordY = window.map.pinPointerPositionY.max;
    } else if (coordY < window.map.pinPointerPositionY.min) {
      coordY = window.map.pinPointerPositionY.min;
    }
    address.value = 'x: ' + coordX + ', y: ' + coordY;
    pinMain.style.left = coordX + 'px';
    pinMain.style.top = coordY + 'px';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, errorHandler);
  });
})();
