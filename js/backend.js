'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var setupXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
