'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var setupXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupXHR(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setupXHR(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
