function Meter(max) {
  var _api = {};
  var _container;
  _api.setValue = function(value) {
    var meter = document.getElementById('meter');
    meter.style.width = ((value * 100) / max) + "%";
  };
  _api.setColor = function(color) {
    var meter = document.getElementById('meter');
    meter.style.backgroundColor = color; 
  };
  _api.appendElementTo = function(parent) {
    parent.appendChild(_container);
  };
  function _init() {
    _container = document.createElement('div');
    _container.id = 'meterContainer';
    _container.classList.add('meterContainer');

    var meter = document.createElement('div');
    meter.id = 'meter';
    meter.classList.add('meter');
    _container.appendChild(meter);
  }

  _init();
  return _api;
}