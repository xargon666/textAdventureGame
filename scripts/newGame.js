const textSection = document.getElementById("text-section");
const textElement = document.getElementById("text-element");

const locationSection = document.getElementById("location-section");
const locationElement = document.getElementById("location-element");

const inventorySection = document.getElementById("inventory-section");
const inventoryItemsElement = document.getElementById("inventory-items");

const imgElement = document.getElementById("room-image");
const optionButtonsElement = document.getElementById("option-buttons");

function play_beep() {
  // var snd = new Audio("https://www.soundjay.com/button/beep-08b.wav");
  // snd.play();
  // return false;
}

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

function hideElement(targetElement) {
  targetElement.style.display = "none";
  console.log("Element hidden = " + inventorySection.id);
}

function revealElement(targetElement) {
  targetElement.style.display = "flex";
  console.log("Element revealed = " + inventorySection.id);
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

function backOption() {
    createButton("Back", () => populateVerbOptions())
  }

const verbOptions = [{id: 0,text: "Move"},{id: 1,text: "Use"},{id: 2,text: "Pick up"},{id: 3,text: "Look at",}];

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
      currentRoom?.roomItems.forEach(index => {
        const targetItem = gameItems.find(targetItem => targetItem.id === index)
        if (targetItem?.canUse) {
            createButton(targetItem.name, () => useObject(targetItem));
        }
      });
      backOption();
      break;
    case 2: // PICK UP
      console.log(currentRoom.name + " available items:");
      console.log(currentRoom.roomItems);
      currentRoom?.roomItems.forEach(index => {
        const targetItem = gameItems.find(targetItem => targetItem.id === index);
        if (targetItem.pickup && targetItem.available) { 
          createButton(targetItem.name, () => pickupObject(targetItem));
        }
      });
      backOption();
      break;
    case 3: // Look at
      console.log(option.id);
      backOption();
      break;
  }
}

function pickupObject(targetObject) {
  targetObject.available = false;
  playerInventory.push(targetObject);
  showText = "You picked up the " + targetObject.name;
  gameTick();
}

function useObject(targetObject) {
    console.log("USE OBJECT - "+ targetObject.name)
    if (targetObject?.activated === true) {
        showText = targetObject?.useText[1]
    };
    if (targetObject?.activated === false) {
        showText = targetObject?.useText[0]
        targetObject.activated = true
    };
    gameTick();
}

function selectMoveOption(index) {
    console.log("SELECT_MOVE_OPTION");
  // check if can move from current location into new location through door
  if (testDoorLocked(playerLocation, index)) {
    showText = "You try to open the door, but it's locked."
    gameTick();
  }
  if (!testDoorLocked(playerLocation, index)) {
    playerLocation = index;
    playerMoved = true;
    play_beep();
    gameTick(); 
}
}

// function showTextNode(textNodeIndex) {
//     const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

//     textElement.innerText = textNode.text

//     textNode.options.forEach(option => {
//         if (showOption(option)) {
//             const button = document.createElement('button')
//             button.innerText = option.text
//             button.classList.add('btn')
//             button.addEventListener('click', () => selectOption(option))
//             optionButtonsElement.appendChild(button)
//         }
//     })
// }

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
    roomItems: [1, 2, 3],
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
    connectingRooms: [2, 5],
    locked: true,
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
    connectingRooms: [2, 1],
    locked: true,
  },
];

function testDoorLocked(fromPos, toPos) {
  const testArr = [fromPos, toPos];
  const door = doors.find((door) => {
    return door.connectingRooms.every((val) => testArr.includes(val));
  });
  return door.locked;
}

// Item States
// 0: is out-of-play (destroyed or not yet introduced)
// 1: is somewhere in the game world, but not yet found by the player
// 2: has been handled by the player e.g. taken and then dropped
// 3: is carried by the player.

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

const gameItems = [
  {
    id: 1,
    name: "bed",
    pickup: false,
    canUse: true,
    useText: ["You do not feel tired."]
  },
  {
    id: 2,
    name: "alarm",
    pickup: false,
    canUse: true,
    activated: false,
    useText : ["you switch off the alarm.","the alarm is already off."]
  },
  {
    id: 3,
    name: "rock",
    pickup: true,
    available: true,
    useText: ["You pickup the rock."]
  },
  {
    id: 4,
    name: "terminal",
    pickup: false,
    canUse: true,
    useText: ["You hit return, and a window titled \"login\" appears on the screen."]
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

// GAME TICK
function gameTick() {
  console.log("GAME TICK");
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
