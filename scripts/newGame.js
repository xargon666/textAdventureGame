const textSection = document.getElementById("text-section");
const textElement = document.getElementById("text-element");
const locationSection = document.getElementById("location-section");
const locationElement = document.getElementById("location-element");
const inventorySection = document.getElementById("inventory-section");
const inventoryItemsElement = document.getElementById("inventory-items");
const imgSection = document.getElementById("image-section");
const imgElement = document.getElementById("room-image");
const optionButtonsElement = document.getElementById("option-buttons");
const terminalSection = document.getElementById("terminal-container")
const terminalOutputText = document.getElementById("terminal-text-output");
const terminalInputText = document.getElementById("terminal-text-input-box");

let showtext = "";
let terminalMode = false;



function play_beep() {
  // var snd = new Audio("https://www.soundjay.com/button/beep-08b.wav");
  // snd.play();
  // return false;
}

function hideElement(targetElement) {
  targetElement.style.display = "none";
  console.log("Element hidden = " + targetElement.id);
}

function revealElement(targetElement) {
  targetElement.style.display = "flex";
  console.log("Element revealed = " + targetElement.id);
}

// CHECK IF PLAYER HAS MOVED TO A NEW ROOM
function playerMovement() {
  if (!playerMoved) {
    console.log("Player position unchanged");
    const currentRoom = rooms.find(
      (currentRoom) => currentRoom.id === playerLocation
    );
    locationElement.innerText = "Location: " + currentRoom.name;
  }
  if (playerMoved) {
    console.log("Player position has changed!");
    const currentRoom = rooms.find(
      (currentRoom) => currentRoom.id === playerLocation
    );
    locationElement.innerText = currentRoom.name;
    showText = "Player moved to the " + currentRoom.name;
    playerMoved = false;
  }
}

const textBook = [
  {
    id: 1,
    room_id: 1,
    text: "You wake up in a strange place.",
  },
  {
    id: 2,
    room_id: 2,
    text: "This is the next room! You made it!",
  },
];

function createButton(textValue, clickEvent) {
  const button = document.createElement("button");
  button.innerText = textValue;
  button.classList.add("btn");
  button.addEventListener("click", clickEvent);
  optionButtonsElement.appendChild(button);
}

function removeButtons() {
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
}

function backOption(textValue, clickEvent) {
  if (textValue === undefined || clickEvent === undefined) {
    createButton("Back", () => populateVerbOptions());
  } else {
    createButton(textValue, clickEvent);
  }

}

const verbOptions = [
  { id: 0, text: "Move" },
  { id: 1, text: "Use" },
  { id: 2, text: "Pick up" },
  { id: 3, text: "Look at" },
];

function populateVerbOptions() {
  //console.log("POPULATE_VERB_OPTIONS")
  removeButtons();
  verbOptions.forEach((option) => {
    return createButton(option.text, () => selectVerbOption(option));
  });
}

function selectVerbOption(option) {
  removeButtons();
  //console.log("SELECT_VERB_OPTION")
  const currentRoom = rooms.find(
    (currentRoom) => currentRoom.id === playerLocation
  );
  //console.log("Current Room: " + currentRoom.name)
  switch (option.id) {
    case 0: // MOVE
      // HOW TO CYCLE THROUGH ARRAY AND POPULATE ROOM NAMES FROM ROOMS.ADJACENT ARRAY????
      currentRoom.adjacent?.forEach((index) => {
        // cycle through array
        console.log("MOVE_TO_ADJACENT_ROOM");
        const nextRoom = rooms.find((nextRoom) => nextRoom.id === index);
        createButton(nextRoom.name, () => selectMoveOption(index));
      });
      backOption();
      break;
    case 1: // USE
      console.log(option.id);
      currentRoom.roomItems?.forEach((index) => {
        const targetItem = gameItems.find(
          (targetItem) => targetItem.id === index
        );
        if (targetItem?.canUse) {
          createButton(targetItem.name, () => useObject(targetItem));
        }
      });
      backOption();
      break;
    case 2: // PICK UP
      console.log(currentRoom.name + " available items:");
      console.log(currentRoom.roomItems);
      currentRoom.roomItems?.forEach((index) => {
        const targetItem = gameItems.find(
          (targetItem) => targetItem.id === index
        );
        if (targetItem.pickup && targetItem.available) {
          createButton(targetItem.name, () => pickUpObject(targetItem));
        }
      });
      backOption();
      break;
    case 3: // LOOK AT
      currentRoom.roomItems?.forEach((index) => {
        const targetItem = gameItems.find(
          (targetItem) => targetItem.id === index
        );
        createButton(targetItem.name, () => lookAtObject(targetItem));
      });
      console.log(option.id);
      backOption();
      break;
  }
}
function lookAtObject(targetItem) {
  showText = targetItem.activated
    ? targetItem.description[1]
    : targetItem.description[0];
  gameTick();
}

function pickUpObject(targetItem) {
  targetItem.available = false;
  playerInventory.push(targetItem);
  showText = "You pick up the " + targetItem.name;
  gameTick();
}

// WHAT HAPPENS WHEN YOU USE AN OBJECT IN A ROOM
function useObject(targetObject) {
  let result = "";
  console.log("USE OBJECT - " + targetObject.name);
  if (targetObject.activated === true) {
    result = targetObject.useText[1];
  }
  if (targetObject.activated === false) { 
    result = targetObject.useText[0];
    targetObject.activated = true;
  }
  if (!targetObject.activated) {
    result = targetObject.useText[0];
  }
  showText = result;
  targetObject.useAction();
  gameTick();
}

function selectMoveOption(index) {
  console.log("SELECT_MOVE_OPTION");
  // check if can move from current location into new location through door
  if (testDoorLocked(playerLocation, index)) {
    showText = "You try to open the door, but it's locked.";
    gameTick();
  }
  if (!testDoorLocked(playerLocation, index)) {
    playerLocation = index;
    playerMoved = true;
    play_beep();
    gameTick();
  }
}

function testDoorLocked(fromPos, toPos) {
  const testArr = [fromPos, toPos];
  const door = doors.find((door) => {
    return door.connectingRooms.every((val) => testArr.includes(val));
  });
  return door.locked;
}

// class item {
//     constructor(name, state, location, description) {
//         this.name = name;
//         this.state = state;
//         this.location = location;
//         this.description = description;
//     }
// };

// const worldItems = [
//     raggedCoat = new item(
//         "Ragged Coat",
//         1,
//         1,
//         "You have owned the coat for many years. It smells faintly of home, and your arm pits.")
// ];

// const player = [{
//     name = loginName;
//     email = loginEmail;
// }]

// INVENTORY FUNCTIONS AND GAME ITEMS
function removeInventory() {
  while (inventoryItemsElement.firstChild) {
    inventoryItemsElement.removeChild(inventoryItemsElement.firstChild);
  }
}

function setupInventory() {
  populateInventory();
}

function populateInventory() {
  console.log("playerInventory:");
  console.log(playerInventory);
  if (playerInventory.length < 1) {
    removeInventory();
  }
  if (playerInventory.length > 0) {
    removeInventory();
    playerInventory.forEach((itemToAdd) => {
      const item = document.createElement("item");
      item.innerText = itemToAdd.name;
      inventoryItemsElement.appendChild(item);
    });
  }
}

// TERMINAL BLOCK
let resultText = "";

const activateTerminal = function(){
  console.log("ACTIVATE TERMINAL");
  terminalMode = true;
  hideElement(imgSection);
  hideElement(inventorySection);
  revealElement(terminalSection);
  removeButtons();
  terminalOutputText.innerText = "ENTER PASSWORD\n";
  resultText = "";
  createButton('Exit',()=>closeTerminal())
};

const closeTerminal = function(){
  console.log("CLOSE TEMRINAL");
  terminalMode = false;
  hideElement(terminalSection);
  revealElement(imgSection);
  revealElement(inventorySection);
  gameTick();
};

terminalInputText.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    console.log("result: " + resultText);
    return updateOutputText();
  }
});

function addLineFeeds(string,num){
  let result = "";
  for(i=0;i<num;i++){
    result = string + "\n"
  };
  return result;
}

const updateOutputText = function () {
  const door = doors.find((door) => door.id === 1);
  if (door.locked === false){
    resultText = `${resultText}DOOR ALREADY UNLOCKED\n`;
  } else if (terminalInputText.value !== door.password) {
    resultText = `${resultText}INCORRECT PASSWORD\n`;
  } else if (terminalInputText.value === door.password) {
    resultText = `${resultText}PASSWORD ACCEPTED: DOOR UNLOCKED\n`;
    door.locked = false;
  }
  let lineCount = resultText.split("\n").length
  if (lineCount >= 7){
    resultText = resultText.split("\n").slice(1).join("\n")
  };
  terminalOutputText.innerText = resultText;
  terminalInputText.value = "";
};

const roomImages = [
  {
    imgIndex: 1,
    imgURL: "./img/SHIP_CREW1.svg",
  },
  {
    imgIndex: 2,
    imgURL: "./img/SHIP_HUB.svg",
  },
  {
    imgIndex: 3,
    imgURL: "./img/SHIP_CREW2.svg",
  },
  {
    imgIndex: 4,
    imgURL: "./img/SHIP_ENGINE.svg",
  },
  {
    imgIndex: 5,
    imgURL: "./img/SHIP_BRIDGE.svg",
  },
];

const rooms = [
  {
    id: 1,
    name: "port side Crew Cabin",
    description:
      "A small cabin clad with panels and blinking lights, but no windows. There is a door, but no windows.",
    adjacent: [2],
    states: {
      visited: false,
      light: false,
      fire: false,
      oxygen: true,
    },
    roomItems: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Hab Module",
    description:
      "The room is the general living area. There are several 'seats' and Utility cabinets line the walls.",
    adjacent: [1, 3, 4, 5],
    states: {
      visited: false,
      light: true,
      fire: false,
      oxygen: true,
    },
  },
  {
    id: 3,
    name: "starboard side Crew Cabin",
    description:
      "The room is filled with steaming computer panels and blinking pipes.",
    adjacent: [2],
    states: {
      visited: false,
      light: true,
      fire: false,
      oxygen: true,
    },
  },
  {
    id: 4,
    name: "Engine Room",
    description:
      "The room is filled with steaming computer panels and blinking pipes.",
    adjacent: [2],
    states: {
      visited: false,
      light: true,
      fire: false,
      oxygen: true,
    },
  },
  {
    id: 5,
    name: "Bridge",
    description:
      "The room is filled with steaming computer panels and blinking pipes.",
    adjacent: [2],
    states: {
      visited: false,
      light: true,
      fire: false,
      oxygen: true,
    },
  },
];

const doors = [
  {
    id: 1,
    connectingRooms: [2, 1],
    locked: true,
    password: "mordida",
  },
  {
    id: 2,
    connectingRooms: [2, 3],
    locked: true,
  },
  {
    id: 3,
    connectingRooms: [2, 4],
    locked: true,
  },
  {
    id: 4,
    connectingRooms: [2, 5],
    locked: true,
  },
];

// Item States
// 0: is out-of-play (destroyed or not yet introduced)
// 1: is somewhere in the game world, but not yet found by the player
// 2: has been handled by the player e.g. taken and then dropped
// 3: is carried by the player.
const gameItems = [
  {
    id: 1,
    state: 1,
    name: "bed",
    pickup: false,
    canUse: true,
    description: ["An unmade bed."],
    useText: ["You do not feel tired."],
  },
  {
    id: 2,
    state: 1,
    name: "alarm",
    pickup: false,
    canUse: true,
    activated: false,
    description: [
      "An alarm, which is shreking it's head off.",
      "A thankfully silent alarm.",
    ],
    useText: ["you switch off the alarm.", "the alarm is already off."],
  },
  {
    id: 3,
    state: 1,
    name: "rock",
    pickup: true,
    available: true,
    description: ["Just a rock"],
  },
  {
    id: 4,
    state: 1,
    name: "terminal",
    pickup: false,
    canUse: true,
    description: [
      "It's a computer terminal. There are a few options showing on the screen.",
    ],
    useText: [
      'You hit return, and a window titled "login" appears on the screen.',
    ],
    useAction: activateTerminal,
  },
];

const displayTextSection = function () {
  if (showText.length < 1) {
    hideElement(textSection);
    revealElement(inventorySection);
    return;
  }
  if (showText.length > 0) {
    hideElement(inventorySection);
    revealElement(textSection);
    textElement.innerText = showText;
    showText = "";
    removeButtons();
    createButton("Continue", () => gameTick());
    return;
  }
};

function storyUpdate() {
  // CHECK IF STORY HAS PROGRESSED
  if (!progressStory) {
    console.log("Story doesn't progress");
    return;
  }
  if (progressStory) {
    console.log("Story continues...");
    const newText = textBook.find((newText) => newText.id === storyPage);
    showText += newText.text;
    //showText += "\n\n"
    progressStory = false;
  }
}

// MAIN GAME STUFF

// INITIAL GAME STATES
let state = {};
let textArrayIteration = 1;
let progressStory = true;
let playerMoved = false;
let playerLocation = 1;
let storyPage = 1;
let showText = "";
const playerInventory = [];

function testContinueGame(){
  return (terminalMode === true ? false : true);
};

// GAME TICK
function gameTick() {
  console.log("GAME TICK");
  if (testContinueGame() === false) {
    console.log("it works!")
    return
  }
  playerMovement();
  populateVerbOptions();
  setupInventory();
  storyUpdate();
  displayTextSection();
  // SHOW CURRENT ROOM IMAGE
  const roomImage = roomImages.find(
    (roomImage) => roomImage.imgIndex === playerLocation
  );
  imgElement.src = roomImage.imgURL;
  // UPDATE TEXT
}

// START
function startGame() {
  gameTick();
}

startGame();
