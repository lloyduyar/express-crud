let InfoClock = document.getElementById("dateAndTime");
setInterval(() => {
  let fullDate = new Date();
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  InfoClock.innerHTML = fullDate;
  // ${hours}:${minutes}:${seconds}
}, 1000);
