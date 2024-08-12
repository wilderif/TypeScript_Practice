const userName = "Test re-compile";

console.log(userName);

// const button = document.querySelector("button")!;
// button.addEventListener("click", () => {
//   console.log("Clicked!");
// });

// const button = document.querySelector("button")!;

// if (button) {
//   button.addEventListener("click", () => {
//     console.log("Clicked!");
//   });
// }

const button = document.querySelector("button")!;

function clickHandler(message: string) {
  console.log("Clicked! " + message);
}

if (button) {
  button.addEventListener("click", clickHandler.bind(null, "Second Argument"));
}
