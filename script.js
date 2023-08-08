const screen = document.querySelector(".create");
const allButtons = document.querySelector(".buttons");
let firstNumber = "0";
let secondNumber = "0";
let result = "0";
let lastResult;
let currentOperator;
let evaluation = [];

allButtons.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  onButtonPress(e);
});

function onButtonPress(e) {
  switch (e.target.getAttribute("data-button-type")) {
    case "digit":
      AssignNumber(e);
      break;
    case "operator":
      AssignOperator(e);
      break;
  }
  render(e);
}
function AssignNumber(e) {
  if (evaluation.length <= 1) {
    let num = e.target.getAttribute("data-value");
    firstNumber =
      firstNumber === "0" ? num : lastResult ? num : firstNumber + num;
    if (evaluation.length === 1) evaluation.shift();
    evaluation.push(firstNumber);
    result = firstNumber;
    return;
  }

  if (evaluation.length >= 2) {
    let num = e.target.getAttribute("data-value");
    secondNumber = secondNumber === "0" ? num : secondNumber + num;
    if (evaluation.length === 3) {
      evaluation.pop();
    }
    evaluation.push(secondNumber);
    result = secondNumber;
  }
}

function AssignOperator(e) {
  currentOperator = e.target.getAttribute("data-value");
  if (currentOperator !== "=" && currentOperator !== "clear") {
    evaluation.push(result);
    evaluation.push(currentOperator);
    firstNumber = result;
    secondNumber = "0";
    result = currentOperator;
  }
  if (currentOperator === "=") {
    operate();
  }
  if (
    currentOperator === "%" ||
    currentOperator === "+/-" ||
    currentOperator === "clear" ||
    currentOperator === "="
  ) {
    return operate();
  }
  if (evaluation === 3) {
    operate();
  }
  if (evaluation.length === 2) {
    evaluation.pop();
  }

  evaluation.splice(1, 1, currentOperator);
}
function operate() {
  if (currentOperator === "%" && evaluation.length) {
    let number = parseInt(evaluation[evaluation.length - 1]);
    result = (number / 100).toString();
    result = result === "NaN" ? "Error" : result;
    evaluation.splice(evaluation.length - 1, 1, result);
    return;
  }
  if (currentOperator === "+/-" && evaluation.length) {
    result = (evaluation[evaluation.length - 1] * -1).toString();
    result = result === "NaN" ? "Error" : result;
    evaluation.splice(evaluation.length - 1, 1, result);
    return;
  }
  if (currentOperator === "clear") {
    firstNumber = "0";
    secondNumber = "0";
    evaluation = [];
    lastResult = "";
    result = "0";
    return;
  }
  if (evaluation.length === 3) {
    result = eval(evaluation.join().replace(/,/g, "")).toString();
    firstNumber = result;
    secondNumber = "0";
    evaluation = [firstNumber];
    lastResult = result;
    return;
  }
}
function render(e) {
  if (result.toString().length > 9) {
    screen.textContent = parseFloat(result).toPrecision(3);
  } else {
    screen.textContent = result;
  }
}
