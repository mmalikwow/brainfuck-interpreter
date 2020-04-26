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
          const nextSqBracket = getNextSqBracket(src.slice(charIndex, src.length)) + charIndex;
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

function Start(string) {
  console.log(Run(Compile(string)));
}

function printf(char) {
  alert(String.fromCharCode(char)); //weird
}

function scanf() {
  return prompt().charCodeAt(0);
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

function getNextSqBracket(str) {
  for (let i = 0; i < str.length; i++) if (str[i] == "]") return i;

  return null;
}

function debug(e) {
  throw e;
}
