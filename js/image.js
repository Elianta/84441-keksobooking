'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var insertImage = function (fileReaderObject, photoContainer) {
    if (photoContainer.innerHTML === '') {
      var newImage = document.createElement('img');
      photoContainer.appendChild(newImage);
    }
    fileReaderObject.addEventListener('load', function () {
      if (newImage) {
        newImage.src = fileReaderObject.result;
      } else {
        var image = photoContainer.querySelector('img');
        image.src = fileReaderObject.result;
      }
    });
  };

  window.image = {
    upload: function (fileChooser, photoContainers) {
      fileChooser.addEventListener('change', function () {
        var maxPhotosNumber = photoContainers.length || 1;
        var selectedFilesNumber = fileChooser.files.length;
        var photosNumber = (selectedFilesNumber > maxPhotosNumber) ? maxPhotosNumber : selectedFilesNumber;
        for (var i = 0; i < photosNumber; i++) {
          var file = fileChooser.files[i];
          var fileName = file.name.toLowerCase();
          var match = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
          });
          if (match) {
            for (var j = i; j < maxPhotosNumber; j++) {
              var container = (maxPhotosNumber === 1) ? photoContainers : photoContainers[j];
              if (maxPhotosNumber === 1 || container.innerHTML === '') {
                var reader = new FileReader();
                insertImage(reader, container);
                reader.readAsDataURL(file);
                break;
              }
            }
          }
        }
      });
    }
  };
})();
