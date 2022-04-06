import * as configKeys from './modules/configKeys.js';
import * as coreVarKeys from "./modules/coreVarKeys.js";
import * as elementKeys from './modules/elementKeys.js'
import * as functionKeys from "./modules/functionKeys.js";
import { gameTick } from './modules/gameTick.js'
import * as imgKeys from "./modules/imgKeys.js";
import * as itemKeys from "./modules/itemKeys.js";
import * as mapElementKeys from './modules/mapElementKeys.js'
import * as wObjectKeys from "./modules/worldObjectKeys.js";

// TERMINAL BLOCK
let resultText = "";

const activateTerminal = function () {
  console.log("ACTIVATE TERMINAL");
  terminalMode = true;
  [elementKeys.imgSection, elementKeys.inventorySection, elementKeys.textSection].forEach(hideElement);
  functionKeys.revealElement(elementKeys.terminalSection);
  functionKeys.removeButtons();
  elementKeys.terminalOutputText.innerText = "ENTER PASSWORD\n";
  resultText = "";
  elementKeys.terminalInputText.focus();
  functionKeys.createButton("Exit", () => closeTerminal());
};

const closeTerminal = function () {
  console.log("CLOSE TEMRINAL");
  terminalMode = false;
  changeGameMode(0);
  hideElement(elementKeys.terminalSection);
  [elementKeys.imgSection, elementKeys.inventorySection, elementKeys.textSection].forEach(functionKeys.revealElement);
  gameTick();
};

elementKeys.terminalInputText.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    console.log("result: " + resultText);
    return updateOutputText();
  }
});

const updateOutputText = function () {
  const door = mapElementKeys.doors.find((door) => door.id === 1);
  if (door.locked === false) {
    resultText = `${resultText}DOOR ALREADY UNLOCKED\n`;
  } else if (elementKeys.terminalInputText.value !== door.password) {
    resultText = `${resultText}INCORRECT PASSWORD\n`;
  } else if (elementKeys.terminalInputText.value === door.password) {
    resultText = `${resultText}PASSWORD ACCEPTED: DOOR UNLOCKED\n`;
    door.locked = false;
  }
  let lineCount = resultText.split("\n").length;
  if (lineCount >= 7) {
    resultText = resultText.split("\n").slice(1).join("\n");
  }
  elementKeys.terminalOutputText.innerText = resultText;
  elementKeys.terminalInputText.value = "";
};

console.log(bed1.description);

const displaytextSection = function () {
  if (showText.length < 1) {
    hideElement(elementKeys.textSection);
    functionKeys.revealElement(elementKeys.inventorySection);
    return;
  }
  if (showText.length > 0) {
    hideElement(elementKeys.inventorySection);
    functionKeys.revealElement(elementKeys.textSection);
    textElement.innerText = showText;
    showText = "";
    functionKeys.removeButtons();
    functionKeys.createButton("Continue", () => continueGame());
    return;
  }
};

const activeTriggers = [];

const chapterEvents = [
  {
    id: 1,
    event_description:
      "Alarm is going off preventing you from doing anything else.",
    event: function () {
      if (lol) {
      }
    },
  },
];

function checkChapterEvents(chapter) {}

// functionKeys.startGame();
// functionKeys.startGame();
functionKeys.startGame();