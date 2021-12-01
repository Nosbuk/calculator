function Calculator() {
  this.input = "";
  this.operation = "";
  this.sign = "";
  this.numsArr = [];
}

Calculator.prototype.add = function () {
  this.numsArr = [this.numsArr.reduce((p, c) => p + c)];
};
Calculator.prototype.subtract = function () {
  this.numsArr = [this.numsArr.reduce((p, c) => p - c)];
};
Calculator.prototype.multiply = function () {
  this.numsArr = [this.numsArr.reduce((p, c) => p * c)];
};
Calculator.prototype.divide = function () {
  this.numsArr = [this.numsArr.reduce((p, c) => p / c)];
};

Calculator.prototype.updateDisplay = function () {
  screen.innerHTML = this.input;
  screen.style.fontSize = `${45 - this.input.length * 0.8}px`;
};

Calculator.prototype.saveNumber = function () {
  this.numsArr.push(Number(this.input));
  this.input = "";
};

Calculator.prototype.getNumberInput = function (input) {
  if (this.operation == "compute" || this.operation == "clear") {
    this.input = "";
  }
  if (this.input.includes(".") && input == ".") {
    input = "";
  }
  if (screen.innerHTML.length < 30) {
    this.input += input;
    this.updateDisplay();
    this.operation = "number";
  }
};

Calculator.prototype.compute = function (sign) {
  if (this.sign != "=") {
    this.saveNumber();
  }
  if (this.numsArr.length == 2) {
    if (this.sign == "+") {
      this.add();
    }
    if (this.sign == "-") {
      this.subtract();
    }
    if (this.sign == "*") {
      this.multiply();
    }
    if (this.sign == "/") {
      this.divide();
    }
    if (sign == "=") {
      if (this.sign == "+") {
        this.add();
      }
      if (this.sign == "-") {
        this.subtract();
      }
      if (this.sign == "*") {
        this.multiply();
      }
      if (this.sign == "/") {
        this.divide();
      }
    }
    this.input = `${this.numsArr[0]}`;
    this.operation = "compute";
    this.updateDisplay();
  }
  this.sign = sign;
};
Calculator.prototype.clear = function () {
  this.operation = "clear";
  this.sign = "";
  this.numsArr = [];
  this.updateDisplay();
  screen.innerHTML = "";
};
const calc = new Calculator();
const btns = document.querySelectorAll(".calculator__button");
const screen = document.querySelector(".calculator__screen");

btns.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.className.includes("numberBtn")) {
      calc.getNumberInput(item.innerHTML);
    }
    if (item.className.includes("operation")) {
      calc.compute(item.innerHTML);
    }
    if (item.className.includes("clearBtn")) {
      calc.clear();
    }
  });
});

document.addEventListener(
  "keydown",
  (event) => {
    let key = event.key;
    if (key == "Enter") {
      key = "=";
    }
    let digitsArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    let operationsArr = ["+", "-", "/", "*", "="];
    if (digitsArr.includes(key)) {
      calc.getNumberInput(key);
    }
    if (operationsArr.includes(key)) {
      calc.compute(key);
    }
    if (key === "Backspace") {
      calc.clear();
    }
  },
  false
);
