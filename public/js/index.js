console.log("Js file loaded");

// fetch("http://localhost:3000/weather?address=alwar")
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     if (res.error) {
//       console.log(res.error);
//     } else {
//       console.log(res);
//     }
//   });

const weatheForm = document.querySelector("form");
const inputValue = document.querySelector("input");
const error = document.querySelector("#error");
const success = document.querySelector("#success");

weatheForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputValue.value;
  fetch(`/weather?address=${location}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        error.innerText = res.error;
      } else {
        success.innerText = res.data.temperature;
      }
    });
});
