function Popup() {
  var _api = {};
  var _emptyPasswordError = "No Password entered.";

  var _colors = ["#FF0000", "#FF0000", "#FFB200", "#45cfc9", "#00FF00"];
  var _strengths = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  var _personalInfoWarning = "Do not use personal information in the password.";

  _api.create = function() {
    focusPasswordField();
    _addEventListeners();
  };

  function focusPasswordField() {
    document.getElementById('userInput').focus();
  }
  function _addEventListeners() {
    var estimateStrengthButton = document.getElementById("estimateStrength");
    estimateStrengthButton.addEventListener("click", _estimatePasswordStrength);

    var optionsAnchor = document.getElementById("options");
    optionsAnchor.addEventListener('click', _openOptionsPage);
  }

  function _openOptionsPage() {
    chrome.runtime.openOptionsPage(function () {});
  }

  function _estimatePasswordStrength() {
    _separateFeedbackUI ();
    var userInput = document.getElementById('userInput').value;
    if (userInput.length > 0) {
      _handleUserInput({password: userInput});
    } else {
      _handleUserInput({error: "empty"});
    }
    focusPasswordField();
  }
  function _separateFeedbackUI () {
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.style.paddingTop = "15px";
  }

  function _handleUserInput(input) {
    _clearFeedbackArea();

    if (input.error === "empty") {
      _displayError(_emptyPasswordError);
    }
    else if (input.password) {
      determinePasswordStrength(input.password)
    }
  }

  function determinePasswordStrength(password) {
    BaseOptionsHandler().getOptions(function(options) {
      var rawUserInputs = Object.keys(options).map(function (key) {return options[key].split(" ")});
      var userInputs = [];
      rawUserInputs.forEach(function(input) {
        input.forEach(function(entry) {
          if (entry && entry.trim().length > 0) {
            userInputs.push(entry.trim());
          }
        })
      });
      _displayPasswordStrength(password, userInputs);
    });
  }

  function _clearFeedbackArea() {
    var feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = "";
  }
  function _displayPasswordStrength(password, userDictionary) {
    var estimate = zxcvbn(password, userDictionary);
    _displayStrengthText(_strengths[estimate.score]);
    var score = estimate.score === 0 ? 0.25 : estimate.score;
    _createMeter(score, _colors[estimate.score]);
    var feedback = _getFeedbackText(estimate.feedback, estimate.sequence, score);
    _displayFeedback(feedback);
  }
  function _getFeedbackText(feedback, sequence, score) {
    var feedbackText = "";
    feedbackText = _appendString(feedbackText, feedback.warning);
    var suggestions = feedback.suggestions;
    if (suggestions) {
      for (var i = 0; i < suggestions.length; i++) {
        feedbackText += ' ';
        feedbackText = _appendString(feedbackText, suggestions[i]);
      }
    }
    if (sequence && score < 4) {
      for (i = 0; i < sequence.length; i++) {
        if (sequence[i].dictionary_name === 'user_inputs') {
          feedbackText += ' ';
          feedbackText = _appendString(feedbackText, _personalInfoWarning);
          break;
        }
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


