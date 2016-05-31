function Meter(max) {
  var _api = {}
  var container;
  _api.setValue = function(value) {
    var meter = document.getElementById('meter');
    meter.style.width = ((value * 100) / max) + "%";
  }
  _api.setColor = function(color) {
    var meter = document.getElementById('meter');
    meter.style.backgroundColor = color; 
  }
  _api.appendElementTo = function(parent) {
    parent.appendChild(container);
  }
  function _init() {
    container = document.createElement('div');
    container.id = 'meterContainer';
    container.classList.add('meterContainer');

    var meter = document.createElement('div');
    meter.id = 'meter';
    meter.classList.add('meter');
    container.appendChild(meter);    
  }

  _init();
  return _api;
}