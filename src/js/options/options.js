document.addEventListener('DOMContentLoaded', function () {
  var optionsHandler = new OptionsHandler();
});
function OptionsHandler() {

  var _api = BaseOptionsHandler();

  function _reset() {
    var inputsCollection = document.getElementsByTagName('input');
    var inputsArray = Array.prototype.slice.call(inputsCollection)
    inputsArray.forEach(function(input) {
      input.value = "";
    });
  }

  function saveOptions() {
    _api.saveOptions(createSaveObject(), function() {
      var notification = document.getElementById('optionsSavedNotification');
      notification.style.display = "inline";
    });
  }

  function createSaveObject() {
    var saveObject = {};
    _api.personalInformation.forEach(function(entry) {
      saveObject[entry] = document.getElementById(entry).value;
    });
    return saveObject;
  }

  function populateSavedOptions() {
    _api.getOptions(function(savedOptions) {
      _api.personalInformation.forEach(function(key) {
        document.getElementById(key).value = savedOptions[key];
      });
    });
  }
  function _init() {
    var resetButton = document.getElementById("resetOptions");
    resetButton.addEventListener('click', _reset);
    var saveButton = document.getElementById("saveOptions");
    saveButton.addEventListener('click', saveOptions);
    populateSavedOptions();
  }

  _init();
}