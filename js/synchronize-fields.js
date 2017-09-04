'use strict';
(function () {
  window.synchronizeFields = function (element1, element2, element1fields, element2fields, syncValues) {
    element1.addEventListener('change', function () {
      var selectedOption = element1.selectedOptions[0].value;
      for (var i = 0; i < element1fields.length; i++) {
        if (element1fields[i] === selectedOption) {
          syncValues(element2, element2fields[i]);
        }
      }
    });
  };
})();
