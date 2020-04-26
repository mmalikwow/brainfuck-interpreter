const editor = document.getElementById("editor");

function Compile(txt) {
  let string = "";
  txt
    .split("")
    .filter(char => testChar(char))
    .forEach(char => (string += char));

  return string;
}

function Run(tsrc) {
  const src = tsrc;
  // Brainfuck Variables
  const tape = new Int8Array(20).fill(0);
  const callStack = [];
  let pointerIndex = 0;

  // Looping variables
  let charIndex = 0;
  while (src[charIndex]) {
    const char = src[charIndex];

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
    }

    charIndex++;
  }

  return tape;
}

function Start(string) {
  console.log(Run(Compile(string)));
}

function printf(char) {
  alert(char); //weird
}

function scanf() {
  return prompt();
}

function testChar(char) {
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
}
