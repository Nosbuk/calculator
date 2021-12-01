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
};

Calculator.prototype.saveNumber = function () {
  this.numsArr.push(Number(this.input));
  this.input = "";
};

Calculator.prototype.getNumberInput = function (input) {
  if (this.operation == "compute" || "clear") {
    this.input = "";
  }
  this.input += input;
  this.updateDisplay();
  this.operation = "number";
};

Calculator.prototype.compute = function (sign) {
  if (this.sign != "=") {
    this.saveNumber();
  }
  console.log(this.numsArr);
  if (this.numsArr.length == 2) {
    if (sign == "+") {
      this.add();
    }
    if (sign == "-") {
      this.subtract();
    }
    if (sign == "*") {
      this.multiply();
    }
    if (sign == "/") {
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
    console.log(this.numsArr);
    this.input = `${this.numsArr[0]}`;
    console.log(this.input);
    this.operation = "compute";
    this.updateDisplay();
  }
  this.sign = sign;
};
Calculator.prototype.clear = function () {
  this.input = ".";
  this.operation = "clear";
  this.sign = "";
  this.numsArr = [];
  this.updateDisplay();
};
const calc = new Calculator();
const btns = document.querySelectorAll(".calculator__button");
const screen = document.querySelector(".calculator__screen");
console.log(btns, screen);

btns.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.className);
    if (item.className.includes("numberBtn")) {
      calc.getNumberInput(item.innerHTML);
    }
    if (item.className.includes("operation")) {
      calc.compute(item.innerHTML);
      console.log("calc");
    }
    if (item.className.includes("clearBtn")) {
      calc.clear();
      console.log("clear");
    }
  });
});
