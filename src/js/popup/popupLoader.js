document.addEventListener('DOMContentLoaded', function () {
  var installOrUpdate = chrome.extension.getBackgroundPage().installOrUpdate;
  if (installOrUpdate) {
    var installNotice = new InstallNotice(installOrUpdate);
    installNotice.create();
    chrome.extension.getBackgroundPage().installOrUpdate = "";
  } else {
    var popup = new Popup();
    popup.create();
  }
});