var socket = io();
const form = document.getElementById('message-form');
const input = document.querySelector('[name=message]');
const list = document.getElementById('message-list');
const locationBox = document.getElementById('locationBox');

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('message', message);
    var li = document.createElement('li');
    li.innerHTML = `${message.from}: ${message.text}`;
    list.append(li);
});

socket.on('newLocationMessage', function (locationMessage) {
  console.log('locationMessage', locationMessage);
    var locationLink = document.createElement('a');
    locationLink.innerHTML = 'link';
    locationLink.target = '_blank';
    locationLink.href = locationMessage.url;
    locationBox.append(locationLink);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: input.value
  }, function () {});

  form.reset();
});

var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', getLocation);

function getLocation () {
  var locator = navigator.geolocation;

  if (!locator) {
    return alert('Geolocation not supported on this browser');
  }

  var coords = locator.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
}
