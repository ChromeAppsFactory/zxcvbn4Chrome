(function() {

  var _modifiedPasswordFields = [];
  function _init() {
    chrome.runtime.onMessage.addListener(_listenRequests);
    var passwordFields = document.querySelectorAll('[type="password"]')
    Array.prototype.slice.call( passwordFields, 0) .forEach(function(passwordField) {
      passwordField.addEventListener('input', _handleChangeEvent);
    })
  }

  function _handleChangeEvent(event) {
    if (_modifiedPasswordFields.indexOf(event.srcElement) === -1) {
      _modifiedPasswordFields.push(event.srcElement);
    }
  }
  function _listenRequests(request, sender, sendResponse) {
    if (request.action === 'getPassword') {
      var message = getPasswordFromDOM();
      sendResponse(message);
    }
  }

  function getPasswordFromDOM() {
    var allPasswordFields = document.querySelectorAll('[type="password"]')
    if (allPasswordFields.length === 0) {//page has no password fields
      return {
        error: "noPasswordField"
      }
    } else {
      var password = '';
      for(var i = 0; i < allPasswordFields.length && !password; i++) {
        if (_modifiedPasswordFields.indexOf(allPasswordFields[i]) !== -1) {
          password = allPasswordFields[i].value;
        }
      }
      if (password.length > 0) {
        return {
          password: password
        }
      } else {
        return {error: "empty"}
      }
    }
  }
  _init();
})();