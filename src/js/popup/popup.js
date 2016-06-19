function Popup() {
  var _api = {};
  var _currentTabId;
  var _noPasswordFieldError = "No password field found on this page.";
  var _emptyPasswordError = "No Password entered.";
  var _appError = "Application Error: Try refreshing the page.";

  var _colors = ["#FF0000", "#FF0000", "#FFB200", "#45cfc9", "#00FF00"];
  var _strengths = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  _api.create = function() {
    _addEventListeners();
  };

  function _addEventListeners() {
    var estimateStrengthButton = document.getElementById("estimateStrength");
    estimateStrengthButton.addEventListener("click", _estimatePasswordStrength);
  }

  function _estimatePasswordStrength() {
    _separateFeedbackUI ();
    var userInput = document.getElementById('userInput').value;
    if (userInput.length > 0) {
      _handleResponse({password: userInput});
    } else {
      _handleResponse({error: "empty"});
    }

  }
  function _separateFeedbackUI () {
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.style.paddingTop = "15px";
  }

  function _handleResponse(response) {
    _clearFeedbackArea();
    if (response) {
      if (response.error) {
        if (response.error === "noPasswordField") {
          _displayError(_noPasswordFieldError)
        } else if (response.error === "empty") {
          _displayError(_emptyPasswordError);
        }
      } else if (response.password) {
        _displayPasswordStrength(response.password);
      }
    } else {
      _displayError(_appError);
    }
  }

  function _clearFeedbackArea() {
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = "";
  }
  function _displayPasswordStrength(password) {
    var estimate = zxcvbn(password);
    _displayStrengthText(_strengths[estimate.score]);
    var score = estimate.score === 0 ? 0.25 : estimate.score;
    _createMeter(score, _colors[estimate.score]);
    var feedback = _getFeedbackText(estimate.feedback);
    _displayFeedback(feedback);
  }
  function _getFeedbackText(feedback) {
    var feedbackText = "";
    feedbackText = _appendString(feedbackText, feedback.warning);
    var suggestions = feedback.suggestions;
    if (suggestions) {
      for (var i = 0; i < suggestions.length; i++) {
        feedbackText += ' ';
        feedbackText = _appendString(feedbackText, suggestions[i]);
      }
    }
    return feedbackText;
  }

  function _appendString(text, textTobeAdded) {
    if (textTobeAdded) {
      text += textTobeAdded
      if (!text.endsWith('.')) {
        text += '.';
      }
    }
    return text;
  }

  function _displayError(errorText) {
    var errorContainer = document.createElement('div');
    errorContainer.classList.add('error');
    errorContainer.innerText = errorText;
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.appendChild(errorContainer);
  }
  function _displayStrengthText(strength) {
    var strengthDiv = document.createElement('div');
    strengthDiv.classList.add('strengthText');
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.appendChild(strengthDiv);
    strengthDiv.innerHTML = '<span style="font-weight: bold">Password Strength: </span>' + strength;
  }
  function _createMeter(value, color) {
    var meter = new Meter(4);
    var feedbackContainer = document.getElementById('feedbackContainer');
    meter.appendElementTo(feedbackContainer);
    meter.setValue(value);
    meter.setColor(color);
  }

  function _displayFeedback(feedback) {
    var feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback');
    feedbackDiv.innerText = feedback;
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.appendChild(feedbackDiv);
  }
  return _api;
}


