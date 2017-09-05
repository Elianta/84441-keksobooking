'use strict';
(function () {
  window.synchronizeFields = function (eventTargetElement, elementToBeSynchronized, eventTargetElementOptionsArray, elementToBeSynchronizedOptionsArray, syncValues) {
    eventTargetElement.addEventListener('change', function () {
      var selectedOption = eventTargetElement.selectedOptions[0].value;
      for (var i = 0; i < eventTargetElementOptionsArray.length; i++) {
        if (eventTargetElementOptionsArray[i] === selectedOption) {
          syncValues(elementToBeSynchronized, elementToBeSynchronizedOptionsArray[i]);
        }
      }
    });
  };
})();
