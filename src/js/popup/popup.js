function Popup() {
  var _api = {};
  var _container;
  var _currentTabId;
  var _noPasswordField = "No password field found on this page.";
  var _emptyPassword = "The password field on the page is empty.";
  var _colors = ["#FF0000", "#FF0000", "#FFB200", "#45cfc9", "#00FF00"];
  var _strengths = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  _api.create = function() {
    sendMessageToCS('getPassword', _handleResponse);
    _container = document.createElement('div');
    _container.classList.add('container');
    document.body.appendChild(_container);
  }

  function _handleResponse(response) {
    if (response) {
      if (response.error) {
        if (response.error === "noPasswordField") {
          displayError(_noPasswordField)
        } else if (response.error === "empty") {
          displayError(_emptyPassword);
        }
      } else if (response.password) {
        var estimate = zxcvbn(response.password);
        displayStrengthText(_strengths[estimate.score]);
        var score = estimate.score === 0 ? 0.25 : estimate.score;
        createMeter(score, _colors[estimate.score]);
        var feedback = getFeedbackText(estimate.feedback);
        displayFeedback(feedback);
      }
    } else {
      _container.innerText = "Application Error: Try refreshing the page."
    }
  }

  function getFeedbackText(feedback) {
    var feedbackText = "";
    feedbackText = appendString(feedbackText, feedback.warning);
    var suggestions = feedback.suggestions;
    if (suggestions) {
      for (var i = 0; i < suggestions.length; i++) {
        feedbackText += ' ';
        feedbackText = appendString(feedbackText, suggestions[i]);
      }
    }
    return feedbackText;
  }

  function appendString(text, textTobeAdded) {
    if (textTobeAdded) {
      text += textTobeAdded
      if (!text.endsWith('.')) {
        text += '.';
      }
    }
    return text;
  }

  function displayError(errorText) {
    var errorContainer = document.createElement('div');
    errorContainer.innerText = errorText;
    _container.appendChild(errorContainer);
  }
  function displayStrengthText(strength) {
    var strengthDiv = document.createElement('div');
    strengthDiv.classList.add('strengthText');
    _container.appendChild(strengthDiv);
    strengthDiv.innerHTML = '<span style="font-weight: bold">Password Strength: </span>' + strength;
  }
  function createMeter(value, color) {
    var meter = new Meter(4);
    meter.appendElementTo(_container);
    meter.setValue(value);
    meter.setColor(color);
  }

  function displayFeedback(feedback) {
    var feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback');
    feedbackDiv.innerText = feedback;
    _container.appendChild(feedbackDiv);
  }
  function sendMessageToCS(message, callback) {
    var tabsQueryData = {
      active: true,
      currentWindow: true
    };
    if (_currentTabId) {
        sendMessageTo(_currentTabId, message, callback)
    } else {
        chrome.tabs.query(tabsQueryData, function (tabs) {
            _currentTabId = tabs[0].id;
            sendMessageTo(_currentTabId, message, callback)
        });
    }

  }

  function sendMessageTo(tabId, message, callback) {
    var message = {
      "action": message
    };

    chrome.tabs.sendMessage(tabId, message, undefined, function(response) {
      if (callback) {
        callback(response);
      }
    });
  }

  return _api;
}


