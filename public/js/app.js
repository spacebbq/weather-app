const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        console.log(data.error);
      } else {
        messageOne.textContent = data.location.location;
        messageTwo.textContent = data.forecast.summary;
        messageThree.textContent =
          "It is currently " + data.forecast.currentTemp + " Degrees Celsius and the current chance of rain is " + data.forecast.currentPrecip;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});