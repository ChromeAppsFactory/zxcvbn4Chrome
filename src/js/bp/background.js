var installOrUpdate = "";
chrome.runtime.onInstalled.addListener(function(details) {
  installOrUpdate = "";
  if(details.reason == "install") {
    installOrUpdate = "install";
  } else if(details.reason == "update") {
    installOrUpdate = "update";
    var thisVersion = chrome.runtime.getManifest().version;
  }
});


