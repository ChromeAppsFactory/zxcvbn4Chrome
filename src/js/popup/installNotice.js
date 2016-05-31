function InstallNotice(installOrUpdate) {
  var _api = {};
  var notice = {
    install: {
      heading: 'Extension Installed !',
      text: ['Extension will not work for tabs that were open prior to installation unless you reload them or restart chrome.']
    },

    update: {
      heading: 'Extension Updated !',
      text: ['Extension will not work for tabs that were open prior to update unless you reload them or restart chrome.']
    }
  }
  _api.create = function() {
    document.body.innerHTML = "";
    var noticeContainer = document.createElement('div');
    noticeContainer.classList.add('instalNotice');
    if (installOrUpdate == 'install') {
      noticeContainer.appendChild(_createHeading(notice.install.heading));
      noticeContainer.appendChild(_createNoticeDiv(notice.install.text));
    } else {
      noticeContainer.appendChild(_createHeading(notice.update.heading));
      noticeContainer.appendChild(_createNoticeDiv(notice.update.text));
    }
    noticeContainer.appendChild(_createGotItButton());
    document.body.appendChild(noticeContainer);
  };

  function _createHeading(heading) {
    var headingDiv = document.createElement('div');
    headingDiv.classList.add('heading');
    headingDiv.innerText = heading;
    return headingDiv;
  }

  function _createNoticeDiv(noticeParts) {
    var noticeDiv = document.createElement('div');
    for (var i = 0; i < noticeParts.length; i++) {
      var noticePart = document.createElement('div');
      noticePart.classList.add('noticepart');
      noticePart.innerText = noticeParts[i];
      noticeDiv.appendChild(noticePart);
    }
    return noticeDiv;
  }
  function _createGotItButton() {
    var gotItButtonDiv = document.createElement('div');
    gotItButtonDiv.classList.add('gotitdiv');
    var gotItButton = document.createElement('button');
    gotItButton.classList.add('gotitbutton');
    gotItButton.innerText = 'Got It';
    gotItButton.addEventListener('click', function() {
      window.close();
    })
    gotItButtonDiv.appendChild(gotItButton);
    return gotItButtonDiv;
  }

  return _api;
}