function BaseOptionsHandler() {
  var _api = {};

  _api.personalInformation = ["firstName", "lastName", "fathersName",
    "mothersName", "spouseName", "child1Name", "child2Name", "child3Name",
    "bestFriendsName", "nickName", "petsName", "currentCity",
    "currentCityZipcode", "homeTown", "homeTownZipcode", "companyName", "dob",
    "favoriteSports", "favoriteActor", "favoriteActress", "emailAddress",
    "mobileno", "licenceplate", "socialsecurity"];

  _api.saveOptions = function(config, callback) {
    chrome.storage.sync.set(createSaveObject(), function() {
      callback();
    });
  }

  _api.getOptions = function(callback) {
    chrome.storage.sync.get(_getSavedOptionsKeys(), function(savedOptions) {
      callback(savedOptions);
    });
  }

  function _getSavedOptionsKeys() {
    var optionsObject = {};
    _api.personalInformation.forEach(function(entry) {
      optionsObject[entry] = "";
    });
    return optionsObject;
  }

  function createSaveObject() {
    var saveObject = {};
    _api.personalInformation.forEach(function(entry) {
      saveObject[entry] = document.getElementById(entry).value;
    });
    return saveObject;
  }
  return _api;
}