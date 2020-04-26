const editor = document.getElementById("editor");
const output = document.getElementById("output");
const input = document.getElementById("input");
input.currentChar = 0;

// Useful code
function Compile(txt) {
  let string = "";
  txt
    .split("")
    .filter(char => Utils.testChar(char))
    .forEach(char => (string += char));

  return string;
}

function Interpret(tsrc) {
  const src = tsrc;
  // Brainfuck Variables
  const tape = new Int8Array(20).fill(0);
  const callStack = [];
  let pointerIndex = 0;

  // Looping variables
  let charIndex = 0;
  while (src[charIndex] !== undefined) {
    const char = src[charIndex];

    let skipAdd = false;

    switch (char) {
      case "<":
        pointerIndex--;
        break;

      case ">":
        pointerIndex++;
        break;

      case "+":
        tape[pointerIndex]++;
        break;

      case "-":
        tape[pointerIndex]--;
        break;

      case ".":
        printf(tape[pointerIndex]);
        break;

      case ",":
        tape[pointerIndex] = scanf();
        break;

      case "[":
        callStack.push(charIndex);

        if (tape[pointerIndex] == 0) {
          const nextSqBracket =
            Utils.getNextSqBracket(src.slice(charIndex, src.length)) + charIndex;
          if (nextSqBracket) charIndex = nextSqBracket;
          else debug(`Unexpected end of input`);
        }
        break;

      case "]":
        charIndex = callStack.pop();
        skipAdd = true;
        break;
    }

    if (!skipAdd) charIndex++;
  }

  return tape;
}

// Temp functions
function Start(string) {
  console.log(Interpret(Compile(string)));
}

// Buttons functions
function Run() {
  const src = Compile(editor.value);
  return Interpret(src);
}

// OUTPUT
function printf(char) {
  alert(String.fromCharCode(char)); //weird
}

// INPUT
function getUserInput() {
  return prompt("Enter your input").charCodeAt(0);
}

function scanf() {
  const val = input.value[input.currentChar];
  if (val) return val.charCodeAt(0);
  else debug(new Error("Not enough input"));
}

// UTILS

const Utils = {
  testChar(char) {
    return (
      char == "<" ||
      char == ">" ||
      char == "+" ||
      char == "-" ||
      char == "." ||
      char == "," ||
      char == "[" ||
      char == "]"
    );
  },

  getNextSqBracket(str) {
    for (let i = 0; i < str.length; i++) if (str[i] == "]") return i;

    return null;
  }
};

function debug(e) {
  throw e;
}
