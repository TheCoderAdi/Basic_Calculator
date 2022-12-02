const btnOption = document.querySelectorAll(".orange");
const screen = document.querySelector(".create");
const numbers = document.querySelectorAll(".numbers");
const clearAll = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const plusMinus = document.querySelector(".plusMinus");
let optState = false;
let opt = "";
let final = 0;

numbers.forEach((number) => {
  number.addEventListener("click", showNumber);

  function showNumber() {
    if (screen.textContent === "0" || optState) {
      screen.textContent = "";
    }
    screen.textContent += this.textContent;
    optState = false;
  }
});

btnOption.forEach((operator) => {
  operator.addEventListener("click", calculator);
  function calculator() {
    optState = true;
    let newOption = this.textContent;
    switch (opt) {
      case "+":
        screen.textContent = final + Number(screen.textContent);
        break;
      case "-":
        screen.textContent = final - Number(screen.textContent);
        break;
      case "x":
        screen.textContent = final * Number(screen.textContent);
        break;
      case "÷":
        screen.textContent = (final / Number(screen.textContent)).toFixed(6);
        break;
    }
    final = Number(screen.textContent);

    opt = newOption;
  }
});

clearAll.addEventListener("click", function () {
  screen.textContent = "0";
});
percent.addEventListener("click", function () {
  screen.textContent = screen.textContent / 100;
});

plusMinus.addEventListener("click", function () {
  if (Math.sign(screen.textContent) == "-1") {
    screen.textContent = Math.abs(screen.textContent);
  } else {
    screen.textContent = -screen.textContent;
  }
});
